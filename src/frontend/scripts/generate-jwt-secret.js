#!/usr/bin/env node

const crypto = require('crypto')

// Gera um secret aleatório seguro de 64 caracteres (512 bits)
const secret = crypto.randomBytes(32).toString('hex')

console.log('='.repeat(60))
console.log('JWT_SECRET gerado com sucesso!')
console.log('='.repeat(60))
console.log('')
console.log('Adicione esta linha ao seu arquivo .env:')
console.log('')
console.log(`JWT_SECRET="${secret}"`)
console.log('')
console.log('='.repeat(60))
console.log('')
console.log('⚠️  IMPORTANTE:')
console.log('   - Não compartilhe este secret')
console.log('   - Use um secret diferente para produção')
console.log('   - Mantenha este secret seguro')
console.log('')





