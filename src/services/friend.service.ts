// friend.service.ts

import * as friendRepository from '../repositories/friend.repository';
import { CreateFriendInput, Friend, UpdateFriendInput } from '../models/friend.model';
import { AppError } from '../utils/app-error';

export async function listFriends(): Promise<Friend[]> {
    return friendRepository.findAllFriends();
}

export async function getFriend(id: number): Promise<Friend> {
    const friend: Friend | null = await friendRepository.findFriendById(id);

    if (friend === null) {
        throw new AppError(404, `Friend ${id} does not exist`);
    }

    return friend;
}

export async function createFriend(input: CreateFriendInput): Promise<Friend> {
    return friendRepository.createFriend(input);
}

export async function updateFriend(id: number, input: UpdateFriendInput): Promise<Friend> {
    const friend: Friend | null = await friendRepository.updateFriend(id, input);

    if (friend === null) {
        throw new AppError(404, `Friend ${id} does not exist`);
    }

    return friend;
}

export async function deleteFriend(id: number): Promise<void> {
    const deleted: boolean = await friendRepository.deleteFriend(id);

    if (!deleted) {
        throw new AppError(404, `Friend ${id} does not exist`);
    }
}
