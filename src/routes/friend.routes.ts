// friend.routes.ts

import { Router } from 'express';
import {
    createFriend,
    deleteFriend,
    getFriend,
    listFriends,
    updateFriend,
} from '../controllers/friend.controller';

const friendRouter: Router = Router();

friendRouter.get('/', listFriends);
friendRouter.post('/', createFriend);
friendRouter.get('/:id', getFriend);
friendRouter.patch('/:id', updateFriend);
friendRouter.delete('/:id', deleteFriend);

export default friendRouter;
