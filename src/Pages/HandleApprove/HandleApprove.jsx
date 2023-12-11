
const HandleApprove = ({item, index, handleApprove, handleDeny, handleSendFeedback,status}) => {
    return (
        <div>
            <tr >
                <td>
                    {index + 1}
                </td>
                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={item?.image} />
                            </div>
                        </div>
                    </div>
                </td>
                <td>{item?.className}</td>
                <td>{item?.instructorName}</td>
                <td>{item?.instructorEmail}</td>
                <td>{item?.availableSeats}</td>
                <td>{item?.price}</td>
                <td>{item?.status}</td>
                <td>
                    <div className="flex flex-col space-y-2">
                        <button
                            className="btn btn-primary btn-xs"
                            onClick={() => handleApprove(item._id)}
                            disabled={status !== 'pending'}
                        >
                            Approve
                        </button>
                        <button
                            className="btn btn-secondary btn-xs"
                            onClick={() => handleDeny(item._id)}
                            disabled={status !== 'pending'}
                        >
                            Deny
                        </button>
                        <button
                            className="btn btn-tertiary btn-xs"
                            onClick={() => handleSendFeedback(item._id)}
                            disabled={status === 'pending' || status === 'approve'}
                        >
                            Send Feedback
                        </button>


                    </div>

                </td>
            </tr>
        </div>
    );
};

export default HandleApprove;