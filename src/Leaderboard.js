function Leaderboard(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={2}>
                        {props.title}
                    </th>
                </tr>
            </thead>
            <tbody>
                {props.leaders.map((l, index) => { // Added index as key
                    return (
                        <tr key={index}> {/* Using the index as the key */}
                            <td>
                                {l.name}
                            </td>
                            <td>
                                {l.amount}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Leaderboard;
