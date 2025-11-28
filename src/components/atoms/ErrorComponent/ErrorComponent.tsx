const ErrorComponent = ({ error }: { error?: string }) => {
    return (
        <>
            {error && <div className="text-red-400 font-semibold">{error}</div>}
        </>
    )
}

export default ErrorComponent