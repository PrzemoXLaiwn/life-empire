// test-db.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function main() {
  try {
    console.log('🔄 Testowanie połączenia z Supabase...\n')
    
    // Test 1: Połączenie
    const dbTime = await prisma.$queryRaw`SELECT NOW() as time`
    console.log('✅ Połączenie OK!')
    console.log('⏰ Czas bazy danych:', dbTime[0].time)
    
    // Test 2: Sprawdź tabele
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    console.log('\n📋 Tabele w bazie danych:', tables.length)
    tables.forEach((t, i) => {
      console.log(`   ${i + 1}. ${t.table_name}`)
    })
    
    // Test 3: Policz użytkowników
    const userCount = await prisma.user.count()
    console.log('\n👥 Liczba użytkowników:', userCount)
    
    // Test 4: Policz postacie
    const charCount = await prisma.character.count()
    console.log('🎮 Liczba postaci:', charCount)
    
    console.log('\n🎉 Wszystkie testy przeszły pomyślnie!')
    
  } catch (error) {
    console.error('\n❌ BŁĄD POŁĄCZENIA!')
    console.error('Komunikat:', error.message)
    
    if (error.message.includes('authentication')) {
      console.error('\n💡 Sprawdź hasło w .env!')
    } else if (error.message.includes('timeout')) {
      console.error('\n💡 Sprawdź połączenie z internetem!')
    } else if (error.message.includes('does not exist')) {
      console.error('\n💡 Uruchom: npx prisma migrate deploy')
    }
  } finally {
    await prisma.$disconnect()
  }
}

main()