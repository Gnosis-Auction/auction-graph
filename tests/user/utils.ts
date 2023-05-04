import { newMockEventWithParams } from "matchstick-as/assembly/index";
import { NewUser } from "../../generated/EasyAuction/EasyAuction";
import { Address, ethereum } from "@graphprotocol/graph-ts";

export const USER_ENTITY_TYPE = "User";

export function createNewUserEvent(userId: i32, userAddress: string): NewUser {
	let newUserEvent = changetype<NewUser>(
		newMockEventWithParams([
			new ethereum.EventParam("userId", ethereum.Value.fromI32(userId)),
			new ethereum.EventParam(
				"userAddress",
				ethereum.Value.fromAddress(Address.fromString(userAddress))
			),
		])
	);
	return newUserEvent;
}
