const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const Contract = await ethers.getContractFactory('Polling')
  const contract = await Contract.deploy()

  await contract.waitForDeployment()

  const address = JSON.stringify({ address: contract.target }, null, 4)
  fs.writeFile('./../Frontend/react-template/src/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address', contract.target)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
