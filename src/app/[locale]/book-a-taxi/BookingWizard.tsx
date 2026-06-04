"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const TABS = [
  { id: "airport_transfer", icon: "✈️", label: "Airport Transfer" },
  { id: "return_airport", icon: "🔄✈️", label: "Return Airport" },
  { id: "one_way", icon: "🚗", label: "One Way" },
  { id: "return", icon: "🔄", label: "Return" },
  { id: "cruise_transfer", icon: "🚢", label: "Cruise / Ferry" },
  { id: "return_cruise", icon: "🔄🚢", label: "Return Cruise" },
  { id: "hourly", icon: "⏰", label: "Hourly Hire" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const AIRPORTS = [
  "London Heathrow — Terminal 1",
  "London Heathrow — Terminal 2",
  "London Heathrow — Terminal 3",
  "London Heathrow — Terminal 4",
  "London Heathrow — Terminal 5",
  "London Gatwick — North Terminal",
  "London Gatwick — South Terminal",
  "Farnborough Airport EGLF",
  "London Luton Airport",
  "London Stansted Airport",
  "Southampton Airport",
];

const PORTS = [
  "Southampton Cruise Terminal",
  "Portsmouth International Port",
  "Tilbury Cruise Terminal",
  "Dover Cruise Terminal",
  "Harwich International Port",
  "Other UK Port",
];

const VEHICLES_CFG = [
  { id: "eclass", name: "E-Class", fullName: "Mercedes E-Class", pax: 3, desc: "Up to 3 pax" },
  { id: "sclass", name: "S-Class", fullName: "Mercedes S-Class", pax: 4, desc: "Up to 4 pax" },
  { id: "vclass", name: "V-Class", fullName: "Mercedes V-Class", pax: 7, desc: "Up to 7 pax" },
  { id: "no_pref", name: "No Preference", fullName: "No Preference", pax: 99, desc: "Any vehicle" },
] as const;

const HOURS_OPTIONS = [2, 3, 4, 5, 6, 8, 10, 12] as const;

// ─────────────────────────────────────────────
// FORM STATE
// ─────────────────────────────────────────────

interface FormState {
  airportDir: "arrival" | "departure";
  airportPickupAirport: string;
  airportDestAirport: string;
  airportFlightNum: string;
  airportAddress: string;
  airportDate: string;
  airportTime: string;
  retAirportDate: string;
  retAirportTime: string;
  retAirportFlight: string;
  owPickup: string;
  owVias: string[];
  owDest: string;
  owDate: string;
  owTime: string;
  retPickup: string;
  retDest: string;
  retOutDate: string;
  retOutTime: string;
  retRetDate: string;
  retRetTime: string;
  cruiseDir: "arrival" | "departure";
  cruisePort: string;
  cruisePortOther: string;
  cruiseAddress: string;
  cruiseDate: string;
  cruiseTime: string;
  cruiseLine: string;
  cruiseShip: string;
  retCruiseDate: string;
  retCruiseTime: string;
  hourlyPickup: string;
  hourlyHours: number;
  hourlyDate: string;
  hourlyTime: string;
  hourlyPlanned: string;
  passengers: number;
  luggage: number;
  handLuggage: number;
  vehicle: string;
  name: string;
  email: string;
  phone: string;
  specialReqs: string;
}

const INIT: FormState = {
  airportDir: "arrival",
  airportPickupAirport: "",
  airportDestAirport: "",
  airportFlightNum: "",
  airportAddress: "",
  airportDate: "",
  airportTime: "",
  retAirportDate: "",
  retAirportTime: "",
  retAirportFlight: "",
  owPickup: "",
  owVias: [],
  owDest: "",
  owDate: "",
  owTime: "",
  retPickup: "",
  retDest: "",
  retOutDate: "",
  retOutTime: "",
  retRetDate: "",
  retRetTime: "",
  cruiseDir: "arrival",
  cruisePort: "",
  cruisePortOther: "",
  cruiseAddress: "",
  cruiseDate: "",
  cruiseTime: "",
  cruiseLine: "",
  cruiseShip: "",
  retCruiseDate: "",
  retCruiseTime: "",
  hourlyPickup: "",
  hourlyHours: 2,
  hourlyDate: "",
  hourlyTime: "",
  hourlyPlanned: "",
  passengers: 1,
  luggage: 1,
  handLuggage: 0,
  vehicle: "no_pref",
  name: "",
  email: "",
  phone: "",
  specialReqs: "",
};

// ─────────────────────────────────────────────
// STYLE HELPERS
// ─────────────────────────────────────────────

const BASE_INPUT =
  "w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#C9A84C] transition-colors text-sm";
const LBL = "block text-sm text-gray-300 mb-1.5 font-medium";
const ERR_CLS = "text-red-400 text-xs mt-1";
const ic = (error?: string) => `${BASE_INPUT}${error ? " !border-red-500" : ""}`;

// ─────────────────────────────────────────────
// PRIMITIVE COMPONENTS
// ─────────────────────────────────────────────

function RadioPair({
  value,
  onChange,
  opts,
}: {
  value: string;
  onChange: (v: string) => void;
  opts: { label: string; value: string }[];
}) {
  return (
    <div className="flex gap-3 mb-5 flex-wrap">
      {opts.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all ${
            value === o.value
              ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10"
              : "border-[#2A2A2A] text-gray-400 hover:border-gray-600"
          }`}
        >
          <span
            className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 ${
              value === o.value ? "border-[#C9A84C]" : "border-gray-600"
            }`}
          >
            {value === o.value && <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />}
          </span>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function LocInput({
  value,
  onChange,
  placeholder,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${ic(error)} pl-9`}
        />
      </div>
      {error && <p className={ERR_CLS}>{error}</p>}
    </div>
  );
}

function AirportSel({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={ic(error)}>
        <option value="">Select airport...</option>
        {AIRPORTS.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      {error && <p className={ERR_CLS}>{error}</p>}
    </div>
  );
}

function PortSel({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={ic(error)}>
        <option value="">Select port...</option>
        {PORTS.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      {error && <p className={ERR_CLS}>{error}</p>}
    </div>
  );
}

function DtRow({
  dLabel,
  tLabel,
  dVal,
  tVal,
  onD,
  onT,
  dErr,
  tErr,
}: {
  dLabel: string;
  tLabel: string;
  dVal: string;
  tVal: string;
  onD: (v: string) => void;
  onT: (v: string) => void;
  dErr?: string;
  tErr?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className={LBL}>{dLabel}</label>
        <input type="date" value={dVal} onChange={(e) => onD(e.target.value)} className={ic(dErr)} />
        {dErr && <p className={ERR_CLS}>{dErr}</p>}
      </div>
      <div>
        <label className={LBL}>{tLabel}</label>
        <input type="time" value={tVal} onChange={(e) => onT(e.target.value)} className={ic(tErr)} />
        {tErr && <p className={ERR_CLS}>{tErr}</p>}
      </div>
    </div>
  );
}

function GoldH({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[#C9A84C] font-semibold text-xs uppercase tracking-widest mb-4">
      {children}
    </h3>
  );
}

function Divider() {
  return <div className="border-t border-[#2A2A2A] my-5" />;
}

// ─────────────────────────────────────────────
// TAB COMPONENTS
// ─────────────────────────────────────────────

type SF = (k: keyof FormState, v: unknown) => void;
type E = Record<string, string>;

function AirportTab({
  form,
  set,
  err,
  isReturn = false,
}: {
  form: FormState;
  set: SF;
  err: E;
  isReturn?: boolean;
}) {
  return (
    <div className="space-y-4">
      <RadioPair
        value={form.airportDir}
        onChange={(v) => set("airportDir", v)}
        opts={[
          { label: "ARRIVAL  (airport → address)", value: "arrival" },
          { label: "DEPARTURE  (address → airport)", value: "departure" },
        ]}
      />

      {form.airportDir === "arrival" ? (
        <>
          <div>
            <label className={LBL}>Pickup Airport</label>
            <AirportSel
              value={form.airportPickupAirport}
              onChange={(v) => set("airportPickupAirport", v)}
              error={err.airportPickupAirport}
            />
          </div>
          <div>
            <label className={LBL}>Flight Number</label>
            <input
              type="text"
              value={form.airportFlightNum}
              onChange={(e) => set("airportFlightNum", e.target.value)}
              placeholder="e.g. BA123"
              className={ic(err.airportFlightNum)}
            />
            {err.airportFlightNum && <p className={ERR_CLS}>{err.airportFlightNum}</p>}
          </div>
          <div>
            <label className={LBL}>Destination Address</label>
            <LocInput
              value={form.airportAddress}
              onChange={(v) => set("airportAddress", v)}
              placeholder="Enter your destination address"
              error={err.airportAddress}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className={LBL}>Pickup Address</label>
            <LocInput
              value={form.airportAddress}
              onChange={(v) => set("airportAddress", v)}
              placeholder="Enter your pickup address"
              error={err.airportAddress}
            />
          </div>
          <div>
            <label className={LBL}>Destination Airport</label>
            <AirportSel
              value={form.airportDestAirport}
              onChange={(v) => set("airportDestAirport", v)}
              error={err.airportDestAirport}
            />
          </div>
          <div>
            <label className={LBL}>Flight Number</label>
            <input
              type="text"
              value={form.airportFlightNum}
              onChange={(e) => set("airportFlightNum", e.target.value)}
              placeholder="e.g. BA123"
              className={ic()}
            />
          </div>
        </>
      )}

      <DtRow
        dLabel="Pickup Date" tLabel="Pickup Time"
        dVal={form.airportDate} tVal={form.airportTime}
        onD={(v) => set("airportDate", v)} onT={(v) => set("airportTime", v)}
        dErr={err.airportDate} tErr={err.airportTime}
      />

      {isReturn && (
        <>
          <Divider />
          <GoldH>Return Journey</GoldH>
          <DtRow
            dLabel="Return Date" tLabel="Return Time"
            dVal={form.retAirportDate} tVal={form.retAirportTime}
            onD={(v) => set("retAirportDate", v)} onT={(v) => set("retAirportTime", v)}
            dErr={err.retAirportDate} tErr={err.retAirportTime}
          />
          <div>
            <label className={LBL}>Return Flight Number</label>
            <input
              type="text"
              value={form.retAirportFlight}
              onChange={(e) => set("retAirportFlight", e.target.value)}
              placeholder="e.g. BA456"
              className={ic()}
            />
          </div>
          <p className="text-gray-500 text-xs">
            Return:{" "}
            {form.airportDir === "arrival"
              ? `${form.airportAddress || "your destination"} → ${form.airportPickupAirport || "airport"}`
              : `${form.airportDestAirport || "airport"} → ${form.airportAddress || "your address"}`}
          </p>
        </>
      )}
    </div>
  );
}

function OneWayTab({ form, set, err }: { form: FormState; set: SF; err: E }) {
  const addVia = () => {
    if (form.owVias.length < 3) set("owVias", [...form.owVias, ""]);
  };
  const updateVia = (i: number, v: string) => {
    const next = [...form.owVias];
    next[i] = v;
    set("owVias", next);
  };
  const removeVia = (i: number) => set("owVias", form.owVias.filter((_, j) => j !== i));

  return (
    <div className="space-y-4">
      <div>
        <label className={LBL}>Pickup Address</label>
        <LocInput
          value={form.owPickup}
          onChange={(v) => set("owPickup", v)}
          placeholder="Enter your pickup address"
          error={err.owPickup}
        />
      </div>

      {form.owVias.map((via, i) => (
        <div key={i}>
          <label className={LBL}>Via Point {i + 1}</label>
          <div className="flex gap-2 items-start">
            <div className="flex-1">
              <LocInput value={via} onChange={(v) => updateVia(i, v)} placeholder={`Via point ${i + 1}`} />
            </div>
            <button
              type="button"
              onClick={() => removeVia(i)}
              aria-label="Remove stop"
              className="mt-3 text-gray-500 hover:text-red-400 transition-colors px-2"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      {form.owVias.length < 3 && (
        <button
          type="button"
          onClick={addVia}
          className="flex items-center gap-2 text-[#C9A84C] text-sm hover:text-[#E8D48A] transition-colors"
        >
          <span className="text-lg leading-none font-light">+</span> Add Stop
        </button>
      )}

      <div>
        <label className={LBL}>Destination Address</label>
        <LocInput
          value={form.owDest}
          onChange={(v) => set("owDest", v)}
          placeholder="Enter your destination"
          error={err.owDest}
        />
      </div>

      <DtRow
        dLabel="Pickup Date" tLabel="Pickup Time"
        dVal={form.owDate} tVal={form.owTime}
        onD={(v) => set("owDate", v)} onT={(v) => set("owTime", v)}
        dErr={err.owDate} tErr={err.owTime}
      />
    </div>
  );
}

function ReturnTab({ form, set, err }: { form: FormState; set: SF; err: E }) {
  return (
    <div className="space-y-4">
      <GoldH>Outward Journey</GoldH>
      <div>
        <label className={LBL}>Pickup Address</label>
        <LocInput
          value={form.retPickup}
          onChange={(v) => set("retPickup", v)}
          placeholder="Enter your pickup address"
          error={err.retPickup}
        />
      </div>
      <div>
        <label className={LBL}>Destination Address</label>
        <LocInput
          value={form.retDest}
          onChange={(v) => set("retDest", v)}
          placeholder="Enter your destination"
          error={err.retDest}
        />
      </div>
      <DtRow
        dLabel="Outward Date" tLabel="Outward Time"
        dVal={form.retOutDate} tVal={form.retOutTime}
        onD={(v) => set("retOutDate", v)} onT={(v) => set("retOutTime", v)}
        dErr={err.retOutDate} tErr={err.retOutTime}
      />

      <Divider />
      <GoldH>Return Journey</GoldH>
      <DtRow
        dLabel="Return Date" tLabel="Return Time"
        dVal={form.retRetDate} tVal={form.retRetTime}
        onD={(v) => set("retRetDate", v)} onT={(v) => set("retRetTime", v)}
        dErr={err.retRetDate} tErr={err.retRetTime}
      />
      {form.retPickup && form.retDest && (
        <p className="text-gray-500 text-xs">
          Return: {form.retDest} → {form.retPickup}
        </p>
      )}
    </div>
  );
}

function CruiseTab({
  form,
  set,
  err,
  isReturn = false,
}: {
  form: FormState;
  set: SF;
  err: E;
  isReturn?: boolean;
}) {
  return (
    <div className="space-y-4">
      <RadioPair
        value={form.cruiseDir}
        onChange={(v) => set("cruiseDir", v)}
        opts={[
          { label: "ARRIVAL  (port → address)", value: "arrival" },
          { label: "DEPARTURE  (address → port)", value: "departure" },
        ]}
      />

      {form.cruiseDir === "arrival" ? (
        <>
          <div>
            <label className={LBL}>Pickup Port</label>
            <PortSel value={form.cruisePort} onChange={(v) => set("cruisePort", v)} error={err.cruisePort} />
          </div>
          {form.cruisePort === "Other UK Port" && (
            <div>
              <label className={LBL}>Port Name</label>
              <input
                type="text"
                value={form.cruisePortOther}
                onChange={(e) => set("cruisePortOther", e.target.value)}
                placeholder="Enter port name"
                className={ic(err.cruisePortOther)}
              />
              {err.cruisePortOther && <p className={ERR_CLS}>{err.cruisePortOther}</p>}
            </div>
          )}
          <div>
            <label className={LBL}>Destination Address</label>
            <LocInput
              value={form.cruiseAddress}
              onChange={(v) => set("cruiseAddress", v)}
              placeholder="Enter your destination address"
              error={err.cruiseAddress}
            />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className={LBL}>Pickup Address</label>
            <LocInput
              value={form.cruiseAddress}
              onChange={(v) => set("cruiseAddress", v)}
              placeholder="Enter your pickup address"
              error={err.cruiseAddress}
            />
          </div>
          <div>
            <label className={LBL}>Destination Port</label>
            <PortSel value={form.cruisePort} onChange={(v) => set("cruisePort", v)} error={err.cruisePort} />
          </div>
          {form.cruisePort === "Other UK Port" && (
            <div>
              <label className={LBL}>Port Name</label>
              <input
                type="text"
                value={form.cruisePortOther}
                onChange={(e) => set("cruisePortOther", e.target.value)}
                placeholder="Enter port name"
                className={ic(err.cruisePortOther)}
              />
              {err.cruisePortOther && <p className={ERR_CLS}>{err.cruisePortOther}</p>}
            </div>
          )}
        </>
      )}

      <DtRow
        dLabel="Date" tLabel="Time"
        dVal={form.cruiseDate} tVal={form.cruiseTime}
        onD={(v) => set("cruiseDate", v)} onT={(v) => set("cruiseTime", v)}
        dErr={err.cruiseDate} tErr={err.cruiseTime}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={LBL}>
            Cruise Line <span className="text-gray-600 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={form.cruiseLine}
            onChange={(e) => set("cruiseLine", e.target.value)}
            placeholder="e.g. P&O Cruises"
            className={ic()}
          />
        </div>
        <div>
          <label className={LBL}>
            Ship Name <span className="text-gray-600 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            value={form.cruiseShip}
            onChange={(e) => set("cruiseShip", e.target.value)}
            placeholder="e.g. Iona"
            className={ic()}
          />
        </div>
      </div>

      {isReturn && (
        <>
          <Divider />
          <GoldH>Return Journey</GoldH>
          <DtRow
            dLabel="Return Date" tLabel="Return Time"
            dVal={form.retCruiseDate} tVal={form.retCruiseTime}
            onD={(v) => set("retCruiseDate", v)} onT={(v) => set("retCruiseTime", v)}
            dErr={err.retCruiseDate} tErr={err.retCruiseTime}
          />
          {form.cruiseAddress && form.cruisePort && (
            <p className="text-gray-500 text-xs">
              Return:{" "}
              {form.cruiseDir === "arrival"
                ? `${form.cruiseAddress} → ${form.cruisePort === "Other UK Port" ? form.cruisePortOther : form.cruisePort}`
                : `${form.cruisePort === "Other UK Port" ? form.cruisePortOther : form.cruisePort} → ${form.cruiseAddress}`}
            </p>
          )}
        </>
      )}
    </div>
  );
}

function HourlyTab({ form, set, err }: { form: FormState; set: SF; err: E }) {
  return (
    <div className="space-y-4">
      <div>
        <label className={LBL}>Pickup Address</label>
        <LocInput
          value={form.hourlyPickup}
          onChange={(v) => set("hourlyPickup", v)}
          placeholder="Enter your pickup address"
          error={err.hourlyPickup}
        />
      </div>

      <div>
        <label className={LBL}>
          Number of Hours{" "}
          <span className="text-gray-600 font-normal">(minimum 2)</span>
        </label>
        <div className="flex flex-wrap gap-2 mt-1">
          {HOURS_OPTIONS.map((h) => (
            <button
              key={h}
              type="button"
              onClick={() => set("hourlyHours", h)}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                form.hourlyHours === h
                  ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]"
                  : "border-[#2A2A2A] text-gray-400 hover:border-gray-600"
              }`}
            >
              {h}h
            </button>
          ))}
        </div>
      </div>

      <DtRow
        dLabel="Start Date" tLabel="Start Time"
        dVal={form.hourlyDate} tVal={form.hourlyTime}
        onD={(v) => set("hourlyDate", v)} onT={(v) => set("hourlyTime", v)}
        dErr={err.hourlyDate} tErr={err.hourlyTime}
      />

      <div>
        <label className={LBL}>
          Planned Destinations <span className="text-gray-600 font-normal">(optional)</span>
        </label>
        <textarea
          value={form.hourlyPlanned}
          onChange={(e) => set("hourlyPlanned", e.target.value)}
          placeholder="e.g. Hotel → Meeting → Lunch → Office → Hotel"
          rows={3}
          className={`${ic()} resize-none`}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SHARED BOTTOM FIELDS
// ─────────────────────────────────────────────

function SharedBottom({ form, set, err }: { form: FormState; set: SF; err: E }) {
  const pax = form.passengers;
  const suggested = pax <= 3 ? "eclass" : pax === 4 ? "sclass" : pax <= 7 ? "vclass" : null;
  const suggestedName = VEHICLES_CFG.find((v) => v.id === suggested)?.fullName;

  return (
    <div className="mt-8 pt-8 border-t border-[#2A2A2A] space-y-8">

      {/* Passengers & Luggage */}
      <div>
        <GoldH>Passengers &amp; Luggage</GoldH>
        <div className="grid grid-cols-3 gap-3">
          {(
            [
              { label: "Passengers", key: "passengers" as const, min: 1, max: 16 },
              { label: "Luggage Bags", key: "luggage" as const, min: 0, max: 10 },
              { label: "Hand Luggage", key: "handLuggage" as const, min: 0, max: 6 },
            ] as const
          ).map(({ label, key, min, max }) => (
            <div key={key}>
              <label className={LBL}>{label}</label>
              <select
                value={form[key]}
                onChange={(e) => set(key, Number(e.target.value))}
                className={ic(err[key])}
              >
                {Array.from({ length: max - min + 1 }, (_, i) => i + min).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              {err[key] && <p className={ERR_CLS}>{err[key]}</p>}
            </div>
          ))}
        </div>
        {pax > 7 && (
          <p className="mt-3 text-amber-400 text-xs leading-relaxed">
            For groups over 7 passengers a Sprinter can be arranged — our coordinator will confirm when they contact you.
          </p>
        )}
      </div>

      {/* Vehicle Preference */}
      <div>
        <GoldH>Vehicle Preference</GoldH>
        {suggested && form.vehicle === "no_pref" && suggestedName && (
          <p className="text-xs text-gray-600 mb-3">
            Based on {pax} passenger{pax > 1 ? "s" : ""}, we suggest the {suggestedName}
          </p>
        )}
        <div className="grid grid-cols-2 gap-3">
          {VEHICLES_CFG.map((v) => {
            const sel = form.vehicle === v.id;
            const sug = v.id === suggested && form.vehicle === "no_pref";
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => set("vehicle", v.id)}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  sel
                    ? "border-[#C9A84C] bg-[#C9A84C]/10"
                    : sug
                    ? "border-[#C9A84C]/40 bg-[#C9A84C]/5"
                    : "border-[#2A2A2A] hover:border-gray-600"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-white font-semibold text-sm">{v.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{v.desc}</div>
                  </div>
                  <span
                    className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      sel ? "border-[#C9A84C]" : "border-gray-600"
                    }`}
                  >
                    {sel && <span className="w-2 h-2 rounded-full bg-[#C9A84C]" />}
                  </span>
                </div>
                {sug && (
                  <span className="inline-block mt-1.5 text-[10px] text-[#C9A84C] bg-[#C9A84C]/10 px-1.5 py-0.5 rounded">
                    Suggested
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Customer Details */}
      <div>
        <GoldH>Your Details</GoldH>
        <div className="space-y-4">
          <div>
            <label className={LBL}>Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="John Smith"
              className={ic(err.name)}
            />
            {err.name && <p className={ERR_CLS}>{err.name}</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={LBL}>Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="john@example.com"
                className={ic(err.email)}
              />
              {err.email && <p className={ERR_CLS}>{err.email}</p>}
            </div>
            <div>
              <label className={LBL}>Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+44 7000 000000"
                className={ic(err.phone)}
              />
              {err.phone && <p className={ERR_CLS}>{err.phone}</p>}
            </div>
          </div>
          <div>
            <label className={LBL}>
              Special Requirements <span className="text-gray-600 font-normal">(optional)</span>
            </label>
            <textarea
              value={form.specialReqs}
              onChange={(e) => set("specialReqs", e.target.value)}
              placeholder="e.g. Child seat required, wheelchair access, meet & greet sign"
              rows={3}
              className={`${ic()} resize-none`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SUCCESS STATE
// ─────────────────────────────────────────────

function SuccessState({
  bookingRef,
  name,
  phone,
  calUrl,
}: {
  bookingRef: string;
  name: string;
  phone: string;
  calUrl: string;
}) {
  return (
    <div className="text-center py-8 px-2">
      <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-3xl font-playfair font-bold text-[#1A237E] mb-3">
        Booking Request Received!
      </h2>
      <p className="text-gray-600 mb-6">Thank you {name}. Your reference is:</p>
      <div className="bg-[#111] border border-[#C9A84C]/30 rounded-xl px-8 py-5 inline-block mb-6">
        <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Booking Reference</p>
        <p className="text-3xl font-playfair font-bold text-[#C9A84C]">{bookingRef}</p>
      </div>
      <p className="text-gray-300 mb-2 max-w-md mx-auto leading-relaxed">
        We will contact you shortly on{" "}
        <span className="text-white font-semibold">{phone}</span>{" "}
        to confirm your fixed rate.
      </p>
      <p className="text-gray-500 text-sm mb-8">
        Urgent? Call{" "}
        <a href="tel:+4401252265363" className="text-[#C9A84C] hover:underline">+44 01252 265363</a>{" "}
        or WhatsApp{" "}
        <a href="https://wa.me/447778356571" className="text-[#C9A84C] hover:underline">+44 7778 356571</a>
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10 px-6 py-3 rounded-full text-sm font-medium transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Add to Calendar
        </a>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#A07830] text-black font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider transition-all"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────

function doValidate(tab: TabId, form: FormState): E {
  const errs: E = {};
  const today = new Date().toISOString().split("T")[0];

  const req = (key: string, val: string | undefined, msg: string) => {
    if (!val?.trim()) errs[key] = msg;
  };
  const reqDate = (key: string, val: string | undefined, label: string) => {
    if (!val) { errs[key] = `${label} is required`; return; }
    if (val < today) errs[key] = `${label} must be a future date`;
  };

  if (tab === "airport_transfer" || tab === "return_airport") {
    if (form.airportDir === "arrival") {
      req("airportPickupAirport", form.airportPickupAirport, "Pickup airport is required");
      req("airportAddress", form.airportAddress, "Destination address is required");
    } else {
      req("airportAddress", form.airportAddress, "Pickup address is required");
      req("airportDestAirport", form.airportDestAirport, "Destination airport is required");
    }
    reqDate("airportDate", form.airportDate, "Pickup date");
    req("airportTime", form.airportTime, "Pickup time is required");
    if (tab === "return_airport") {
      reqDate("retAirportDate", form.retAirportDate, "Return date");
      req("retAirportTime", form.retAirportTime, "Return time is required");
      if (form.retAirportDate && form.airportDate && form.retAirportDate < form.airportDate)
        errs.retAirportDate = "Return date must be after outward date";
    }
  }

  if (tab === "one_way") {
    req("owPickup", form.owPickup, "Pickup address is required");
    req("owDest", form.owDest, "Destination is required");
    reqDate("owDate", form.owDate, "Pickup date");
    req("owTime", form.owTime, "Pickup time is required");
  }

  if (tab === "return") {
    req("retPickup", form.retPickup, "Pickup address is required");
    req("retDest", form.retDest, "Destination is required");
    reqDate("retOutDate", form.retOutDate, "Outward date");
    req("retOutTime", form.retOutTime, "Outward time is required");
    reqDate("retRetDate", form.retRetDate, "Return date");
    req("retRetTime", form.retRetTime, "Return time is required");
    if (form.retRetDate && form.retOutDate && form.retRetDate < form.retOutDate)
      errs.retRetDate = "Return date must be after outward date";
  }

  if (tab === "cruise_transfer" || tab === "return_cruise") {
    if (form.cruiseDir === "arrival") {
      req("cruisePort", form.cruisePort, "Pickup port is required");
      req("cruiseAddress", form.cruiseAddress, "Destination address is required");
    } else {
      req("cruiseAddress", form.cruiseAddress, "Pickup address is required");
      req("cruisePort", form.cruisePort, "Destination port is required");
    }
    if (form.cruisePort === "Other UK Port")
      req("cruisePortOther", form.cruisePortOther, "Port name is required");
    reqDate("cruiseDate", form.cruiseDate, "Date");
    req("cruiseTime", form.cruiseTime, "Time is required");
    if (tab === "return_cruise") {
      reqDate("retCruiseDate", form.retCruiseDate, "Return date");
      req("retCruiseTime", form.retCruiseTime, "Return time is required");
      if (form.retCruiseDate && form.cruiseDate && form.retCruiseDate < form.cruiseDate)
        errs.retCruiseDate = "Return date must be after outward date";
    }
  }

  if (tab === "hourly") {
    req("hourlyPickup", form.hourlyPickup, "Pickup address is required");
    reqDate("hourlyDate", form.hourlyDate, "Start date");
    req("hourlyTime", form.hourlyTime, "Start time is required");
  }

  if (form.passengers < 1) errs.passengers = "At least 1 passenger required";
  req("name", form.name, "Full name is required");
  if (!form.email.trim()) errs.email = "Email address is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email address required";
  req("phone", form.phone, "Phone number is required");

  return errs;
}

// ─────────────────────────────────────────────
// CALENDAR URL HELPER
// ─────────────────────────────────────────────

function buildCalUrl(tab: TabId, form: FormState, ref: string): string {
  const dtMap: Record<TabId, { date: string; time: string }> = {
    airport_transfer: { date: form.airportDate, time: form.airportTime },
    return_airport: { date: form.airportDate, time: form.airportTime },
    one_way: { date: form.owDate, time: form.owTime },
    return: { date: form.retOutDate, time: form.retOutTime },
    cruise_transfer: { date: form.cruiseDate, time: form.cruiseTime },
    return_cruise: { date: form.cruiseDate, time: form.cruiseTime },
    hourly: { date: form.hourlyDate, time: form.hourlyTime },
  };
  const { date, time } = dtMap[tab];
  if (!date || !time) return "https://calendar.google.com";

  const [h, m] = time.split(":").map(Number);
  const endH = (h + 2) % 24;
  const d = date.replace(/-/g, "");
  const ts = `${String(h).padStart(2, "0")}${String(m).padStart(2, "0")}00`;
  const te = `${String(endH).padStart(2, "0")}${String(m).padStart(2, "0")}00`;

  return (
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent(`Dinez Transfer — ${ref}`)}` +
    `&details=${encodeURIComponent(`Ref: ${ref} | +44 01252 265363`)}` +
    `&dates=${d}T${ts}/${d}T${te}`
  );
}

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────

export default function BookingWizard() {
  const [tab, setTab] = useState<TabId>("airport_transfer");
  const [form, setFormState] = useState<FormState>(INIT);
  const [errs, setErrs] = useState<E>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ bookingRef: string; calUrl: string } | null>(null);
  const formRef = useRef<HTMLElement>(null);

  const set: SF = (key, val) => {
    setFormState((p) => ({ ...p, [key]: val }));
    if (errs[key as string]) setErrs((p) => ({ ...p, [key as string]: "" }));
  };

  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = doValidate(tab, form);
    if (Object.keys(found).length > 0) {
      setErrs(found);
      scrollToForm();
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/booking-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ journeyType: tab, form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSuccess({ bookingRef: data.bookingRef, calUrl: buildCalUrl(tab, form, data.bookingRef) });
      scrollToForm();
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please call us on +44 01252 265363.");
    } finally {
      setLoading(false);
    }
  };

  const renderTab = () => {
    switch (tab) {
      case "airport_transfer":
        return <AirportTab form={form} set={set} err={errs} />;
      case "return_airport":
        return (
          <>
            <GoldH>Outward Journey</GoldH>
            <AirportTab form={form} set={set} err={errs} isReturn />
          </>
        );
      case "one_way":
        return <OneWayTab form={form} set={set} err={errs} />;
      case "return":
        return <ReturnTab form={form} set={set} err={errs} />;
      case "cruise_transfer":
        return <CruiseTab form={form} set={set} err={errs} />;
      case "return_cruise":
        return (
          <>
            <GoldH>Outward Journey</GoldH>
            <CruiseTab form={form} set={set} err={errs} isReturn />
          </>
        );
      case "hourly":
        return <HourlyTab form={form} set={set} err={errs} />;
    }
  };

  return (
    <main className="bg-[#0A0A0A] min-h-screen">
      <Navbar />

      {/* ───── HERO ───── */}
      <section className="relative pt-28 pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80"
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/80 via-[#0A0A0A]/60 to-[#0A0A0A]" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#C9A84C]/10 border border-[#C9A84C]/30 rounded-full px-5 py-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-[0.3em] uppercase">
              Executive Transfer Specialists
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-[#1A237E] mb-6 leading-tight">
            SECURE YOUR 5-STAR
            <br className="hidden sm:block" />
            EXECUTIVE TRANSFER
            <br className="hidden sm:block" />
            CHAUFFEUR SERVICE
          </h1>

          <p className="text-gray-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Your dedicated Client Coordinator will contact you to confirm your fixed rate. No hidden fees — transparent, premium pricing every journey.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={scrollToForm}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#A07830] text-black font-bold px-8 py-4 rounded-full text-sm uppercase tracking-[0.15em] transition-all shadow-lg shadow-[#C9A84C]/30 hover:scale-105"
            >
              SECURE A 5-STAR SERVICE
            </button>
            <Link
              href="/en/get-a-quote"
              className="w-full sm:w-auto inline-flex items-center justify-center border-2 border-[#C9A84C]/60 hover:border-[#C9A84C] text-[#C9A84C] px-8 py-4 rounded-full text-sm uppercase tracking-[0.15em] transition-all hover:bg-[#C9A84C]/5"
            >
              REQUEST PRIORITY CONFIRMATION
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            {[
              { mark: "★", platform: "TripAdvisor", note: "9× Excellence" },
              { mark: "G", platform: "Google", note: "4.9 Rating" },
              { mark: "Y", platform: "Yell", note: "Top Rated" },
              { mark: "F", platform: "FreeIndex", note: "Verified" },
            ].map((b) => (
              <div key={b.platform} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10 flex items-center justify-center text-[#C9A84C] font-bold text-xs shrink-0">
                  {b.mark}
                </div>
                <div className="text-left">
                  <div className="text-white text-xs font-semibold leading-tight">{b.platform}</div>
                  <div className="text-gray-500 text-[10px] leading-tight">{b.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── DINEZ DIFFERENCE ───── */}
      <section className="py-12 px-4 sm:px-6 bg-[#111111] border-y border-[#2A2A2A]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: "🏆",
              title: "Award-Winning 5-Star Reliability",
              text: "9× TripAdvisor Excellence Award. Trusted by thousands of discerning travellers across the UK.",
            },
            {
              icon: "🚘",
              title: "Exclusive Executive Fleet Standard",
              text: "All-Mercedes fleet maintained to the highest specification for unrivalled comfort and prestige.",
            },
            {
              icon: "👤",
              title: "Dedicated Client Coordination",
              text: "Your personal coordinator confirms every detail, your fixed rate, and ensures punctual, stress-free travel.",
            },
          ].map((d) => (
            <div key={d.title} className="flex flex-col items-center gap-3 px-4">
              <span className="text-3xl">{d.icon}</span>
              <h3 className="text-white font-semibold text-sm">{d.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── BOOKING FORM ───── */}
      <section ref={formRef} id="booking-form" className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-xs uppercase tracking-[0.3em] font-semibold mb-2">
              Quote Request
            </p>
            <h2 className="text-3xl font-playfair font-bold text-[#1A237E] mb-2">
              Request Your Booking
            </h2>
            <p className="text-gray-600 text-sm">
              Complete the form — your Client Coordinator will confirm your fixed rate.
            </p>
          </div>

          {success ? (
            <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
              <SuccessState
                bookingRef={success.bookingRef}
                name={form.name}
                phone={form.phone}
                calUrl={success.calUrl}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Tab Bar */}
              <div className="overflow-x-auto pb-2 mb-6">
                <div className="flex gap-2" style={{ width: "max-content" }}>
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTab(t.id)}
                      className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all whitespace-nowrap min-w-[86px] ${
                        tab === t.id
                          ? "border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]"
                          : "border-[#2A2A2A] text-gray-400 hover:border-gray-600 hover:text-gray-200 bg-[#1C1C1C]"
                      }`}
                    >
                      <span className="text-xl leading-none">{t.icon}</span>
                      <span className="text-center leading-tight">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Card */}
              <div className="bg-[#1C1C1C] border border-[#2A2A2A] rounded-2xl p-6 sm:p-8">
                {renderTab()}
                <SharedBottom form={form} set={set} err={errs} />

                {/* Submit */}
                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-3 bg-[#C9A435] hover:bg-[#B8932E] text-white font-bold py-4 rounded-xl uppercase tracking-widest text-sm transition-all disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "REQUEST YOUR BOOKING →"
                    )}
                  </button>
                  <p className="text-center text-gray-500 text-xs mt-3 leading-relaxed">
                    Your dedicated Client Coordinator will contact you to confirm your fixed rate.
                    <br />
                    Bookings confirmed during business hours.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  );
}
