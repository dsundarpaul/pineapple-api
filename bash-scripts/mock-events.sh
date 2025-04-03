#!/bin/bash

API_URL="http://localhost:3000/api/events"  # Change this to your actual API endpoint
EVENT_COUNT=10  # Number of mock events to create

echo "Seeding database with $EVENT_COUNT mock events..."

for ((i=1; i<=EVENT_COUNT; i++)); do
    EVENT_NAME="Tech Conference $((RANDOM % 1000 + 2025))"
    EVENT_AGENDA="Day 1: AI, Day 2: Cloud Computing"
    EVENT_DESCRIPTION="Annual conference on emerging technologies."
    
    START_DATE="2025-06-$((RANDOM % 28 + 1))T09:00:00Z"
    END_DATE="2025-06-$((RANDOM % 28 + 2))T18:00:00Z"

    EVENT_LOCATION="Convention Center $((RANDOM % 5 + 1))"
    EVENT_VENUE="Hall $((RANDOM % 3 + 1))"
    VENUE_CAPACITY=$((RANDOM % 500 + 100))

    SPEAKER_NAME="Speaker_$i"
    SPEAKER_COMPANY="TechCorp_$((RANDOM % 10 + 1))"
    SPEAKER_DESIGNATION="CTO"
    SPEAKER_BIO="Expert in AI and Blockchain, with $((RANDOM % 20 + 5)) years of experience."
    SPEAKER_LINKEDIN="https://linkedin.com/in/speaker_$i"

    # JSON payload
    read -r -d '' PAYLOAD <<EOF
{
  "eventName": "$EVENT_NAME",
  "eventAgenda": "$EVENT_AGENDA",
  "eventDescription": "$EVENT_DESCRIPTION",
  "eventStartDateTime": "$START_DATE",
  "eventEndDateTime": "$END_DATE",
  "eventLocation": "$EVENT_LOCATION",
  "eventVenue": "$EVENT_VENUE",
  "eventVenueCapacity": $VENUE_CAPACITY,
  "speakers": [
    {
      "name": "$SPEAKER_NAME",
      "company": "$SPEAKER_COMPANY",
      "designation": "$SPEAKER_DESIGNATION",
      "bio": "$SPEAKER_BIO",
      "linkedinUrl": "$SPEAKER_LINKEDIN"
    }
  ]
}
EOF

    # Send API request in parallel
    (curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "$PAYLOAD" &)

    echo "✅ Event $i ($EVENT_NAME) created."
done

# Wait for all parallel jobs to finish
wait

echo "Seeding completed!"
