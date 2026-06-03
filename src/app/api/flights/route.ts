import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const flightNumber = new URL(req.url).searchParams.get("flight");
    if (!flightNumber) {
      return NextResponse.json({ error: "Flight number required. Use ?flight=BA123" }, { status: 400 });
    }

    const apiKey = process.env.AVIATIONSTACK_API_KEY;
    if (!apiKey) return NextResponse.json({ status: "unknown", flightNumber });

    const res = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&flight_iata=${encodeURIComponent(flightNumber.toUpperCase())}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return NextResponse.json({ status: "unknown", flightNumber });

    const data = await res.json();
    if (data.error || !data.data?.length) return NextResponse.json({ status: "unknown", flightNumber });

    const f = data.data[0];
    return NextResponse.json({
      flightNumber: f.flight.iata,
      airline: f.airline.name,
      status: f.flight_status,
      departure: {
        airport: f.departure.airport,
        iata: f.departure.iata,
        scheduled: f.departure.scheduled,
        actual: f.departure.actual ?? null,
        delayMinutes: f.departure.delay ?? 0,
      },
      arrival: {
        airport: f.arrival.airport,
        iata: f.arrival.iata,
        scheduled: f.arrival.scheduled,
        actual: f.arrival.actual ?? null,
        delayMinutes: f.arrival.delay ?? 0,
      },
    });
  } catch (error) {
    console.error("GET /api/flights error:", error);
    return NextResponse.json({ status: "unknown", error: "Failed to fetch flight data" });
  }
}
