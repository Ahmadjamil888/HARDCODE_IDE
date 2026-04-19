import { createClient } from './supabase/server';
import { embedText } from './embeddings';

export async function retrieveContext(query: string, deviceType?: string, topK = 5): Promise<string> {
  const supabase = await createClient();
  const embedding = await embedText(query);

  // In Supabase, similarity search is usually done via a RPC function 
  // or a raw SQL query if using pgvector directly.
  // We'll assume a 'match_embeddings' function exists in Supabase.
  
  const { data, error } = await supabase.rpc('match_embeddings', {
    query_embedding: embedding,
    match_threshold: 0.7,
    match_count: topK,
    filter_device_type: deviceType || null
  });

  if (error) {
    console.error('RAG Retrieval Error:', error);
    return '';
  }

  if (!data || data.length === 0) return '';

  return data.map((chunk: any) => `Source: ${chunk.source}\nContent: ${chunk.content}`).join('\n\n---\n\n');
}
