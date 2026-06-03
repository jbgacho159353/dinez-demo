// SQL to create the drivers table (run once in Supabase SQL editor):
// CREATE TABLE IF NOT EXISTS drivers (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   created_at timestamptz DEFAULT now(),
//   name text NOT NULL,
//   email text,
//   phone text,
//   whatsapp text,
//   vehicle_assigned text,
//   dbs_check_date date,
//   status text DEFAULT 'available',
//   notes text
// );
// ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Authenticated users can manage drivers" ON drivers FOR ALL USING (auth.role() = 'authenticated');

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("drivers")
      .select("*")
      .order("name");
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, error } = await supabaseAdmin
      .from("drivers")
      .insert(body)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;
    const { data, error } = await supabaseAdmin
      .from("drivers")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");
    const { error } = await supabaseAdmin.from("drivers").delete().eq("id", id!);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
