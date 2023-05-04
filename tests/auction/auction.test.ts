import {
	afterEach,
	assert,
	clearStore,
	describe,
	log,
	test,
} from "matchstick-as/assembly/index";
import {
	createNewAuctionEvent,
	auctioningTokenContractAddress,
	biddingTokenContractAddress,
	mockAuctionDataFunctionCall,
	mockTokenSymbol,
	mockTokenDecimals,
	AUCTION_DETAIL_ENTITY_TYPE,
} from "./utils";
import { handleNewAuction, handleNewUser } from "../../src/mapping";
import { createNewUserEvent } from "../user/utils";
import { BigInt } from "@graphprotocol/graph-ts";

describe("Mocked Events", () => {
	afterEach(() => {
		clearStore();
	});

	test("Can call mappings with custom events", () => {
		let newAuctionEvent = createNewAuctionEvent(
			0x1,
			"0x3b2a7fA9CEb3732D4B853c522490f0Cd2ACd4509",
			"0x3F53802E6b65455305c3f9412C8C9118B2E86d49",
			1683094249,
			1683104249,
			0x1,
			BigInt.fromString("1000000000000000000000"),
			BigInt.fromString("2000000000000000000000"),
			BigInt.fromString("10000000000000000000"),
			BigInt.fromString("100000000000000000000"),
			"0x0000000000000000000000000000000000000000",
			"0x"
		);

		let newUserEvent = createNewUserEvent(
			0x1,
			"0x5eA1474CeFA1ea5986327F97932B587deD802CF7"
		);

		handleNewUser(newUserEvent);

		mockAuctionDataFunctionCall(
			BigInt.fromString("1"),
			"0x3b2a7fA9CEb3732D4B853c522490f0Cd2ACd4509",
			"0x3F53802E6b65455305c3f9412C8C9118B2E86d49",
			1683094249,
			1683104249,
			"0x000000000000000b000000056bc75e2d63100000000000b96608c8103bf00000",
			BigInt.fromString("10000000000000000000"),
			0,
			"0x0000000000000000000000000000000000000000000000000000000000000001",
			"0x0000000000000000000000000000000000000000000000000000000000000000",
			0,
			false,
			false,
			0,
			BigInt.fromString("100000000000000000000")
		);

		mockTokenSymbol(auctioningTokenContractAddress, "AUT");
		mockTokenDecimals(auctioningTokenContractAddress, 18);

		mockTokenSymbol(biddingTokenContractAddress, "BDT");
		mockTokenDecimals(biddingTokenContractAddress, 18);

		handleNewAuction(newAuctionEvent);

		assert.entityCount(AUCTION_DETAIL_ENTITY_TYPE, 1);
		log.success("Assert entity count", []);

		assert.fieldEquals(
			AUCTION_DETAIL_ENTITY_TYPE,
			"1",
			"exactOrder",
			"1-1000000000000000000000-2000000000000000000000-1"
		);
		log.success("Assert entity field entries", []);
	});
});
