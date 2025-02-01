import Message from "./Message"

//overflow class will make it scroll down

const Messages =() => {
    return (
        <div className='px-4 flex-1 overflow-auto'>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />

        </div>
    )
}
export default Messages