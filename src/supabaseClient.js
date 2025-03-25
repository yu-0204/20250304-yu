// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// 將以下 API URL 和 public anon key 替換為您自己的 Supabase 項目憑證
const supabaseUrl = 'https://qxyvyveatikwblkqpvux.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4eXZ5dmVhdGlrd2Jsa3FwdnV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MDExMTEsImV4cCI6MjA1ODQ3NzExMX0.naGBE1zSWvBsLQ3Okq3bj4hR3pFReNE5LfprTVwybSM';

export const supabase = createClient(supabaseUrl, supabaseKey);
