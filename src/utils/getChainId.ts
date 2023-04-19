function getChainHexFromName(chainName: string): string {
	if (chainName.includes("goerli")) {
		return "0x05";
	} else if (chainName.includes("mainnet")) {
		return "0x01";
	} else if (chainName.includes("matic")) {
		return "0x89";
	} else if (chainName.includes("gnosis")) {
		return "0x64";
	} else if (chainName.includes("mumbai")) {
		return "0x13881";
	}
	return "0x01";
}

function getChainIdFromName(chainName: string): i32 {
    if (chainName.includes("goerli")) {
		return 5;
	} else if (chainName.includes("mainnet")) {
		return 1;
	} else if (chainName.includes("matic")) {
		return 132;
	} else if (chainName.includes("gnosis")) {
		return 100;
	} else if (chainName.includes("mumbai")) {
		return 80001;
	}
	return 1;
}

export { getChainHexFromName, getChainIdFromName };