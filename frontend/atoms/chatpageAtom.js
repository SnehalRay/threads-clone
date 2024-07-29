import { atom } from "recoil";

export const chatpageAtom = atom({
    key:'chatpageAtom',
    default: []
});

export const selectedConversationAtom = atom({
    key:'selectedConversationAtom',
    default: {
        _id:"",
        userId:"",
        username:"",
        profilePic:"",
    }
});
