import { useState } from 'react'
import { useWalletAddress } from '@sentre/senhub'
import { Transaction } from '@solana/web3.js'
import { useParser } from 'idl-parser-core'

import { Button, ButtonProps } from 'antd'

import { getAnchorProvider, notifyError, notifySuccess } from 'helper'

type ButtonTxInstructProps = { instruct: string } & ButtonProps
const ButtonTxInstruct = ({ instruct, ...props }: ButtonTxInstructProps) => {
  const [loading, setLoading] = useState(false)
  const { txInstructions } = useParser()
  const walletAddress = useWalletAddress()

  const onClick = async (key: string) => {
    try {
      setLoading(true)
      if (!txInstructions || !Object.keys(txInstructions).length) return
      const { data: instruction, signer } = txInstructions[key]

      const transaction = new Transaction().add(instruction)
      const provider = getAnchorProvider(walletAddress)
      const txId = await provider.sendAndConfirm(transaction, signer)
      notifySuccess(key, txId)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={() => onClick(instruct)} loading={loading} {...props}>
      {instruct}
    </Button>
  )
}

export default ButtonTxInstruct
