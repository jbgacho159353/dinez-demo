// SQL to create the corporate_accounts table (run once in Supabase SQL editor):
// CREATE TABLE IF NOT EXISTS corporate_accounts (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   created_at timestamptz DEFAULT now(),
//   company_name text NOT NULL,
//   contact_name text,
//   email text,
//   phone text,
//   address text,
//   payment_terms integer DEFAULT 30,
//   credit_limit_gbp numeric DEFAULT 0,
//   status text DEFAULT 'active',
//   notes text
// );
// ALTER TABLE corporate_accounts ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Authenticated users can manage corporate_accounts" ON corporate_accounts FOR ALL USING (auth.role() = 'authenticated');

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("corporate_accounts")
      .select("*")
      .order("company_name");
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
      .from("corporate_accounts")
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
      .from("corporate_accounts")
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
    const { error } = await supabaseAdmin.from("corporate_accounts").delete().eq("id", id!);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
