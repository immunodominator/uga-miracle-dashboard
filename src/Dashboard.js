import React from "react";
import { Row } from "react-bootstrap";
import Countdown from "react-countdown";
import RecentDonations from "./RecentDonations"; // Ensure this component is implemented correctly

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            donations: [],         // Donations that will be displayed on the table
            bigDonation: null,     // The most recent donation for the alert
            isAlertVisible: false, // Whether the donation alert should be visible
            pollingInterval: 5000, // Polling every 5 seconds
        };
    }

    componentDidMount() {
        // Start polling when the component mounts
        this.interval = setInterval(this.pollForDonations, this.state.pollingInterval);
        this.pollForDonations(); // Initial fetch as soon as component mounts
    }

    componentWillUnmount() {
        // Clear polling interval when component unmounts
        clearInterval(this.interval);
    }

    pollForDonations = () => {
        // Fetch the donations from the API
        fetch('https://events.dancemarathon.com/api/events/6212/donations?limit=5')
            .then(response => response.json())
            .then(newDonations => {
                console.log("Fetched donations:", newDonations); // Log fetched donations
                if (newDonations && newDonations.length > 0) {
                    // Filter out donations under $5
                    const filteredDonations = newDonations.filter(donation => donation.amount >= 5);
                    console.log("Filtered donations:", filteredDonations); // Log filtered donations

                    if (filteredDonations.length > 0) {
                        this.setState(prevState => {
                            // Extract donation IDs from the previous state and the new data
                            const existingDonationIDs = prevState.donations.map(donation => donation.donationID);
                            console.log("Existing donation IDs:", existingDonationIDs); // Log existing donation IDs
                            const uniqueDonations = filteredDonations.filter(donation => !existingDonationIDs.includes(donation.donationID));
                            console.log("Unique donations:", uniqueDonations); // Log unique donations

                            // Only update state if there are new unique donations
                            if (uniqueDonations.length > 0) {
                                // Sort donations by the created date to ensure they are in the correct order
                                const sortedDonations = [...uniqueDonations, ...prevState.donations]
                                    .sort((a, b) => new Date(b.createdDateUTC) - new Date(a.createdDateUTC)); // Sorting by most recent date
                                const bigDonation = sortedDonations[0]; // Assume the first new donation is the "big" one
                                return {
                                    donations: sortedDonations, // Updated sorted list of donations
                                    bigDonation, // Update the "big donation"
                                    isAlertVisible: true, // Show the donation alert
                                };
                            }
                            return {}; // No new donations, no need to update state
                        }, () => {
                            // Hide the donation alert after 8 seconds
                            if (this.state.isAlertVisible) {
                                setTimeout(() => {
                                    this.setState({ isAlertVisible: false });
                                }, 8000);
                            }
                        });
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching donations:", error);
            });
    };

    render() {
        return (
            <>
                <Row className="filledRow">
                    <div className="donationTable">
                        {/* Donation Alert */}
                        {this.state.isAlertVisible && (
                            <div className="donationAlert">
                                <h1>
                                    <strong>{this.state.bigDonation ? this.state.bigDonation.recipientName : "Someone"}</strong>
                                    just received a donation of
                                    <strong>${this.state.bigDonation ? this.state.bigDonation.amount.toFixed(2) : 0}</strong>!
                                </h1>
                            </div>
                        )}

                        {/* Recent Donations Table */}
                        <RecentDonations donations={this.state.donations} />
                    </div>
                </Row>

                <Row style={{ display: "inline-block" }}>
                    {/* Countdown Timer */}
                    <div className="countdown">
                        <Countdown date={new Date("Mar 29, 2025 23:59:00")} daysInHours={true} />
                        <span style={{ padding: 0 }}> until Dance Marathon Total Reveal!</span>
                    </div>
                </Row>
            </>
        );
    }
}

export default Dashboard;
