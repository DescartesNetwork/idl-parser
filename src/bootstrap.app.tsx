import { useCallback, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { AntdProvider, rpc } from '@sentre/senhub'
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
    if (!window.sentre.solana) return
    const address = await window.sentre.solana.getAddress()
    setWalletAddress(address)
  }, [])

  useEffect(() => {
    getWalletAddress()
  }, [getWalletAddress])

  return (
    <AntdProvider appId={appId} prefixCls={appId}>
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
    </AntdProvider>
  )
}

export * from 'static.app'
