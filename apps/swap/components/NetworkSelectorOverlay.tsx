import { CheckIcon } from '@heroicons/react/outline'
import chains, { Chain, ChainId } from '@sushiswap/chain'
import { useDebounce } from '@sushiswap/hooks'
import { classNames, Input, Loader, NetworkIcon, Overlay, SlideIn, Typography } from '@sushiswap/ui'
import { SUPPORTED_CHAIN_IDS } from 'config'
import React, { FC, useCallback, useMemo, useRef, useState } from 'react'
import { Theme } from 'types'

interface NetworkSelectorOverlay {
  open: boolean
  onClose(): void
  onSelect(network: ChainId): void
  selected: ChainId
  className?: string
  networks?: { [k: string]: Chain }
  theme: Theme
}

export const NetworkSelectorOverlay: FC<NetworkSelectorOverlay> = ({
  networks = Object.fromEntries(
    Object.entries(chains).filter(([chainId]) => SUPPORTED_CHAIN_IDS.includes(Number(chainId)))
  ),
  open,
  onClose,
  onSelect,
  selected,
  theme,
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState<string>()
  const debouncedQuery = useDebounce(query, 200)
  const searching = useRef<boolean>(false)

  const handleSelect = useCallback(
    (chainId: ChainId) => {
      onSelect(chainId)
      onClose()

      setQuery(undefined)
    },
    [onClose, onSelect]
  )

  const filteredChains: [string, Chain][] = useMemo(() => {
    if (!debouncedQuery) {
      searching.current = false
      return Object.entries(networks)
    }

    searching.current = false
    return Object.entries(networks).filter(([k, v]) => v.name.toLowerCase().includes(debouncedQuery.toLowerCase()))
  }, [networks, debouncedQuery])

  return (
    <SlideIn.FromLeft show={open} unmount={false} onClose={onClose} afterEnter={() => inputRef.current?.focus()}>
      <Overlay.Content>
        <Overlay.Header onClose={onClose} title="Select Network" />
        <div
          className={classNames(
            theme.background.secondary,
            'w-full relative flex items-center justify-between gap-1 rounded-xl focus-within:ring-2'
          )}
        >
          <Input.Address
            id="network-search"
            ref={inputRef}
            placeholder="Search network by name"
            value={query}
            onChange={(val: string) => {
              searching.current = true
              setQuery(val)
            }}
            className={classNames(
              theme.primary.default,
              theme.primary.hover,
              '!border-none !ring-offset-0 !shadow-none font-bold placeholder:font-medium !ring-0 w-full'
            )}
          />
          {searching.current && <Loader size="16px" />}
        </div>
        <div className={classNames(theme.background.secondary, 'rounded-xl overflow-hidden h-[calc(100%-92px)]')}>
          <div className="h-full overflow-auto hide-scrollbar">
            {filteredChains.map(([k, chain]) => (
              <Typography
                onClick={() => handleSelect(chain.chainId)}
                key={chain.chainId}
                variant="sm"
                className={classNames(
                  selected === chain.chainId
                    ? classNames(theme.primary.default, theme.primary.hover, '!font-bold ')
                    : classNames(theme.secondary.default, theme.secondary.hover, '!font-medium '),
                  'flex items-center gap-1.5 cursor-pointer py-2 pr-3 pl-1.5'
                )}
              >
                {selected === chain.chainId ? (
                  <CheckIcon width={20} height={20} className="text-blue" />
                ) : (
                  <div className="flex items-center justify-center w-5 h-5">
                    <NetworkIcon type="naked" chainId={chain.chainId} width={18} height={18} />
                  </div>
                )}
                {chain.name}
              </Typography>
            ))}
          </div>
        </div>
      </Overlay.Content>
    </SlideIn.FromLeft>
  )
}