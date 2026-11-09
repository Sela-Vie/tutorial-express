// friend.controller.ts

import { Request, Response } from 'express';
import * as friendService from '../services/friend.service';
import {
    parseCreateFriendInput,
    parseFriendId,
    parseUpdateFriendInput,
} from '../validator/friend.validator';
import { CreateFriendInput, Friend, UpdateFriendInput } from '../models/friend.model';

export async function listFriends(_req: Request, res: Response): Promise<void> {
    const friends: Friend[] = await friendService.listFriends();

    res.json({
        success: true,
        data: friends,
    });
}

export async function getFriend(req: Request, res: Response): Promise<void> {
    const id: number = parseFriendId(req.params.id);
    const friend: Friend = await friendService.getFriend(id);

    res.json({
        success: true,
        data: friend,
    });
}

export async function createFriend(req: Request, res: Response): Promise<void> {
    const input: CreateFriendInput = parseCreateFriendInput(req.body);
    const friend: Friend = await friendService.createFriend(input);

    res.status(201).json({
        success: true,
        data: friend,
    });
}

export async function updateFriend(req: Request, res: Response): Promise<void> {
    const id: number = parseFriendId(req.params.id);
    const input: UpdateFriendInput = parseUpdateFriendInput(req.body);
    const friend: Friend = await friendService.updateFriend(id, input);

    res.json({
        success: true,
        data: friend,
    });
}

export async function deleteFriend(req: Request, res: Response): Promise<void> {
    const id: number = parseFriendId(req.params.id);
    await friendService.deleteFriend(id);

    res.json({
        success: true,
        data: null,
    });
}
