const ErrorComponent = ({ error }: { error?: string }) => {
    return (
        <>
            {error && <div className="text-warning  font-semibold">{error}</div>}
        </>
    )
}

export default ErrorComponent