import { useContext, useRef } from 'react'
import { Context } from '@context/context'
import Head from 'next/head'
import { Typography } from 'antd'
const { Paragraph } = Typography

import projects from 'data/projects'
import styles from '@styles/Services.module.scss'
import CodeSnippet from '@components/UI/CodeSnippet.jsx'
import AnimatedSection from '@components/AnimatedSection'
import useNetInfo from 'hooks/useNetInfo'
import useFetchSnapInfo from '@hooks/useFetchSnapInfo'
import CodeBlock from '@components/UI/CodeBlock'
import { split } from 'postcss/lib/list'

const API = ({ name, type }) => {
	const project = projects[type][name]
	const { livePeers, livePeersCounter } = useNetInfo(name, type)
	const tcpLivePeers = livePeers.split(',').map(s => (s ? 'tcp://' + s : ''))
	const explorer = useRef()
	const projectName = project?.name || name.charAt(0).toUpperCase() + name.slice(1)
	const { bin, path, peerID, seedID, seedPort, peerPort, unsafeReset, evmRPC, stateSync } = project
	explorer.current = project.explorer
	const wasm = useRef('false')
	const { theme } = useContext(Context)

	const PEERS = peerID ? `tcp://${peerID}@${name}-${type}-peer.mekonglabs.tech:${peerPort}${tcpLivePeers}` : ''
	const LIVE_PEERS = peerID ? `"${PEERS}"` : `"${tcpLivePeers.slice(1)}"`
	const SEEDS = seedID ? `${seedID}@${name}-${type}-seed.mekonglabs.tech:${seedPort}` : ''
	const gRPC = `${name}-${type}-grpc.mekonglabs.tech:${peerPort ? peerPort.slice(0, 2) : ''}090`

	const { snapHeight, snapSize, snapTime } = useFetchSnapInfo(name, type)

	return (
		<AnimatedSection>
			<Head>
				<title>{`${projectName} - Services`}</title>
				<meta name='description' content='ITRocket 🚀 | Crypto Multipurpose Project' />
			</Head>

			<div
				className={styles.mainColumn}
				id='mainColumn'
				style={{ backgroundColor: theme === 'light' ? '#fff' : '#1b1b1b' }}
			>
				<h2 id='rpc'>RPC, Indexer</h2>
				<div className='flex flex-col flex-wrap gap-1 mb-1'>
					<div className='flex flex-wrap gap-1 items-center'>
						<span>Public RPC: </span>
						<a href={`https://rpc-namada.mekonglabs.tech`} target='_blank' rel='noopener referrer'>
							{`https://rpc-namada.mekonglabs.tech`}
						</a>
						<Paragraph
							copyable={{
								text: `https://rpc-namada.mekonglabs.tech`,
								tooltips: false
							}}
						/>
					</div>
				</div>

				<div className='flex flex-col flex-wrap gap-1 mb-1'>
					<div className='flex flex-wrap gap-1 items-center'>
						<span>Public Indexer: </span>
						<a href={`https://namadexer.mekonglabs.tech`} target='_blank' rel='noopener referrer'>
							{`https://namadexer.mekonglabs.tech`}
						</a>
						<Paragraph
							copyable={{
								text: `https://namadexer.mekonglabs.tech`,
								tooltips: false
							}}
						/>
					</div>
				</div>

				<h2 id='snap'>Snapshot </h2>
				{snapHeight == undefined ? (
					<CodeSnippet theme={theme} code={`## Snapshot is not available yet`} />
				) : (
					<>
						<p>
							height: <b className={styles.bold}>{snapHeight}</b>
							{' | '}
							<b className={styles.bold}>{`${snapTime} ago`}</b>
							{' | '}
							size: <b className={styles.bold}>{`${snapSize}B`}</b>
						</p>
					</>
				)}
				<p className={styles.text_secondary}>updates every 24h</p>

				<CodeBlock
					desc='Download snapshot:'
					code={`cd $HOME
wget -O snap_namada.tar https://testnet-files.mekonglabs.tech/namada/snap_namada.tar
`}
				/>
				<CodeBlock
					desc='Stop node and unpack snapshot:'
					code={`sudo systemctl stop namadad
cp $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/cometbft/data/priv_validator_state.json $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/cometbft/priv_validator_state.json.backup
tar -xvf snap_namada.tar -C $HOME/.local/share/namada/public-testnet-15.0dacadb8d663
rm -rf $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/db $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/cometbft/data
cd $HOME
tar -xvf snap_namada.tar -C $HOME/.local/share/namada/public-testnet-15.0dacadb8d663
mv $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/cometbft/priv_validator_state.json.backup $HOME/.local/share/namada/public-testnet-15.0dacadb8d663/cometbft/data/priv_validator_state.json

`}
				/>
				<CodeBlock
					desc='Restart node:'
					code={`sudo systemctl restart namadad && sudo journalctl -u namadad -f`}
				/>
				<CodeBlock desc='Delete snap file:' code={`rm -rf snap_namada.tar`} />
			</div>
		</AnimatedSection>
	)
}

export default API
