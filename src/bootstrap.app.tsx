import { useCallback, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { WalletProvider, UIProvider, rpc } from '@sentre/senhub'

import View from 'view'

import configs from 'configs'
import model from 'model'
import { ParserProvider } from 'idl-parser-core'

const {
  manifest: { appId },
} = configs

export const Page = () => {
  const [walletAddress, setWalletAddress] = useState('')

  const getWalletAddress = useCallback(async () => {
    if (!window.sentre.wallet) return
    const address = await window.sentre.wallet.getAddress()
    setWalletAddress(address)
  }, [])

  useEffect(() => {
    getWalletAddress()
  }, [getWalletAddress])

  return (
    <UIProvider appId={appId} antd>
      <WalletProvider>
        <Provider store={model}>
          <ParserProvider
            connection={rpc}
            walletAddress={walletAddress}
            programAddresses={{ provider: '' }}
          >
            <View />
          </ParserProvider>
        </Provider>
      </WalletProvider>
    </UIProvider>
  )
}

export * from 'static.app'
