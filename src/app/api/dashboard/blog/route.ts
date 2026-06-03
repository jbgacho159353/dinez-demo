// SQL to create the blog_posts table (run once in Supabase SQL editor):
// CREATE TABLE IF NOT EXISTS blog_posts (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   created_at timestamptz DEFAULT now(),
//   title text NOT NULL,
//   slug text UNIQUE NOT NULL,
//   excerpt text,
//   content text,
//   cover_image text,
//   category text,
//   status text DEFAULT 'draft',
//   published_at timestamptz,
//   author text DEFAULT 'Dinez Team',
//   seo_title text,
//   seo_description text,
//   views integer DEFAULT 0
// );
// ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Allow authenticated full access on blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
// CREATE POLICY "Allow public read of published posts" ON blog_posts FOR SELECT USING (status = 'published');

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const status = searchParams.get("status");

    let query = supabaseAdmin
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (status && status !== "all") query = query.eq("status", status);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body.status === "published" && !body.published_at) {
      body.published_at = new Date().toISOString();
    }
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
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
    if (updates.status === "published" && !updates.published_at) {
      updates.published_at = new Date().toISOString();
    }
    const { data, error } = await supabaseAdmin
      .from("blog_posts")
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
    const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id!);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
