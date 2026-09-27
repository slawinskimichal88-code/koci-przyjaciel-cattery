import { NextResponse } from "next/server";

const INDEXNOW_KEY = "7f8a9b2c4d5e6f1a2b3c4d5e6f7a8b9c";
const HOST = "kociprzyjaciel.pl";

export async function POST(request: Request) {
  // Opcjonalne zabezpieczenie tokenem (jeśli zdefiniowano zmienną INDEXNOW_SECRET)
  if (process.env.INDEXNOW_SECRET) {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.INDEXNOW_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const urlsToSubmit = [
    `https://${HOST}/`,
    `https://${HOST}/dostepne-kociaki`,
    `https://${HOST}/kocieta`,
    `https://${HOST}/o-nas`,
    `https://${HOST}/galeria`,
    `https://${HOST}/baza-wiedzy`,
    `https://${HOST}/kontakt`,
  ];

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urlsToSubmit,
      }),
    });

    return NextResponse.json({
      status: response.status,
      message:
        response.status === 200 || response.status === 202
          ? "URLs successfully submitted to IndexNow"
          : "Submission failed",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "IndexNow submission exception", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ready",
    host: HOST,
    endpoint: "POST /api/indexnow",
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
  });
}
