import React from 'react';
import { Center } from "native-base";
import CompoResquests from "../components/CompoRequests";

/*
SELECT 
	(SELECT pp.NAME FROM people pp WHERE pp.idpeople = pr.who_requested) AS whoresquested,
	pr.dtrequested,
	pr.howmanyitem, 
	r.resquestdescription AS request,
	pr.roomnumber, 
	pr.dtrequestdone, 
	p.name AS responsible 
	FROM people p
INNER JOIN people_has_requests pr ON (p.idpeople = pr.fk_people)
INNER JOIN requests r ON (pr.fk_requests = r.idrequests);
*/

const ScreenRequests = () => {
    return (
        <Center flex={1}>
            <CompoResquests />
        </Center>
    );
};

export default ScreenRequests;