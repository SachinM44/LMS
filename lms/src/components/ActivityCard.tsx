import React from "react";
import { Activity, ActivityType } from "../types";
import { ClassCard } from "./ClassCard";
import { AssessmentCard } from "./AssessmentCard";



export interface ActivityCardProps {
    activity: Activity;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
    activity
}) => {

    if (activity.type === ActivityType.CLASS) {
        return <ClassCard activity={activity} />
    }

    return (
        <AssessmentCard activity={activity} />
    )
}