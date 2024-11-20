const GestOLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 via-teal-500 to-blue-500">
            {children}
        </div>
    )
}

export default GestOLayout;