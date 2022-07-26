import { useCallback, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { WalletProvider, UIProvider, rpc } from '@sentre/senhub'
import { ParserProvider } from 'idl-parser-core'

import View from 'view'

import model from 'model'
import configs from 'configs'

import 'static/styles/dark.less'
import 'static/styles/light.less'

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
    <UIProvider appId={appId} antd={{ prefixCls: appId }}>
      <WalletProvider>
        <Provider store={model}>
          <ParserProvider
            rpc={rpc}
            walletAddress={walletAddress}
            programAddresses={{ provider: '' }}
            appId={appId}
          >
            <View />
          </ParserProvider>
        </Provider>
      </WalletProvider>
    </UIProvider>
  )
}

export * from 'static.app'
