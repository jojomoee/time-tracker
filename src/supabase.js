import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xnzshyslpruunjpiivsi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhuenNoeXNscHJ1dW5qcGlpdnNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUyNzQwNTgsImV4cCI6MjA0MDg1MDA1OH0.dSXP_5F9nErpRNLvpgYh2yB5028JKYrd3WQJtQYovqQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
