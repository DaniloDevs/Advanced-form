import {createClient} from '@supabase/supabase-js'

export const supabase = createClient(
    'https://fsdmbsqkesbwcqbbmkes.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzZG1ic3FrZXNid2NxYmJta2VzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4Mjg2MDUwNCwiZXhwIjoxOTk4NDM2NTA0fQ.E-rnDtBorREto42tA8PahsZD2IBrJkKQHp5BuTugRgE'
)