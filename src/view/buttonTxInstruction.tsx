import { useState } from 'react'
import { useParser } from 'idl-parser'
import { useWallet } from '@sentre/senhub'
import { Transaction } from '@solana/web3.js'

import { Button, ButtonProps } from 'antd'

import { getAnchorProvider, notifyError, notifySuccess } from 'helper'

type ButtonTxInstructProps = { instruct: string } & ButtonProps
const ButtonTxInstruct = ({ instruct, ...props }: ButtonTxInstructProps) => {
  const [loading, setLoading] = useState(false)
  const { txInstructions } = useParser()
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const onClick = async (key: string) => {
    try {
      setLoading(true)
      if (!txInstructions || !Object.keys(txInstructions).length) return
      const instruction = txInstructions[key]
      const transaction = new Transaction().add(instruction)
      const provider = getAnchorProvider(walletAddress)
      const txId = await provider.sendAndConfirm(transaction)
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
