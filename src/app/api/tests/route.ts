import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { projectId, testSuite, deviceId } = await req.json();

  const { data, error } = await supabase
    .from('test_runs')
    .insert({
      project_id: projectId,
      user_id: user.id,
      device_id: deviceId,
      status: 'pending',
      results: { testSuite }
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    success: true,
    testRunId: data.id,
    message: 'Test run initialized. Triggering execution on device bridge.'
  });
}
