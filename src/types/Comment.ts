export interface Comment {
    id: number;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
    children: Comment[]; // 대댓글 (무한 중첩)
}
