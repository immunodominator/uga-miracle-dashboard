import DonationRow from "./DonationRow";

function RecentDonations(props) {
    return props.donations && props.donations.length > 0 ? (
        <div>
            <table cellSpacing={20} className="tableBg">
                <colgroup>
                    <col span={1} style={{"width": "5%"}}/>
                    <col span={1} style={{"width": "20%"}}/>
                    <col span={1} style={{"width": "20%"}}/>
                    <col span={1} style={{"width": "10%"}}/>
                    <col span={1} style={{"width": "45%"}}/>
                </colgroup>
                <thead>
                    <tr>
                        <th colSpan={2}>
                            Miracle Maker
                        </th>
                        <th>
                            Donor
                        </th>
                        <th>
                            Amount
                        </th>
                        <th>
                            Message
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.donations.map((donation, index) => { // Added index as key
                        return <DonationRow key={index} donation={donation}/>; // Using the index as the key
                    })}
                </tbody>
            </table>
        </div>
    ) : <></>;
    function RecentDonations(props) {
        console.log("Recent Donations Prop:", props.donations); // Log donations prop
        return props.donations && props.donations.length > 0 ? (
            <div>
                <table cellSpacing={20} className="tableBg">
                    {/* Table content */}
                </table>
            </div>
        ) : <></>;
    }
    
}

export default RecentDonations;
