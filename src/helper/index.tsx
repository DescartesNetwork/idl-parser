import { AnchorProvider } from '@project-serum/anchor'
import { rpc, util } from '@sentre/senhub'

import { PublicKey, Connection, Transaction } from '@solana/web3.js'

export const notifySuccess = (content: string, txId: string) => {
  return window.notify({
    type: 'success',
    description: `${content} successfully. Click to view details.`,
    onClick: () => window.open(util.explorer(txId), '_blank'),
  })
}

export const notifyError = (er: any) => {
  return window.notify({
    type: 'error',
    description: er.message,
  })
}

export const getAnchorProvider = (walletAddress: string) => {
  const node = rpc
  const wallet = window.sentre.solana
  const connection = new Connection(node, 'confirmed')

  const signAllTransactions = async (transactions: Transaction[]) => {
    const signedTransactions = []
    for (const transaction of transactions) {
      const signedTransaction = await wallet.signTransaction(transaction)
      signedTransactions.push(signedTransaction)
    }
    return signedTransactions
  }

  const publicKey = new PublicKey(walletAddress)
  return new AnchorProvider(
    connection,
    {
      publicKey: new PublicKey(publicKey),
      signTransaction: wallet.signTransaction,
      signAllTransactions,
    },
    {
      commitment: 'confirmed',
      skipPreflight: true,
    },
  )
}
