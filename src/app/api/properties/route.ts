
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { propertySchema } from "@/schemas/property";

export const runtime = "nodejs";

function getSupabaseClient(accessToken?: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Missing Supabase URL or anon key");
  }

  return createClient(url, anonKey, {
    global: accessToken
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {},
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// GET: Return publicly approved properties.
export async function GET() {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("properties")
      .select(
        "id, title, address, city, price, bedrooms, bathrooms, square_feet, created_at"
      )
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: "Unable to retrieve properties", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ properties: data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }
}

// POST: Validate and create a property for the authenticated owner.
export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : null;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const supabase = getSupabaseClient(token);

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const body: unknown = await request.json();
    const result = propertySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("properties")
      .insert({
        ...result.data,
        owner_id: user.id,
        status: "draft",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Unable to create property", details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ property: data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request or server configuration" },
      { status: 400 }
    );
  }
}
