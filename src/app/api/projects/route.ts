import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name, targetDevice, language, description } = await req.json();

  const { data, error } = await supabase
    .from('projects')
    .insert({
      user_id: user.id,
      name,
      target_device: targetDevice,
      language,
      description
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Create initial file
  const initialFilename = language === 'micropython' ? 'main.py' : 
                         language === 'verilog' ? 'main.v' : 'main.ino';
  
  await supabase.from('files').insert({
    project_id: data.id,
    path: initialFilename,
    content: '// New project started',
    language
  });

  return NextResponse.json(data);
}
