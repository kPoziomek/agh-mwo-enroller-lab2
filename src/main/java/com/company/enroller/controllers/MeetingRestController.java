package com.company.enroller.controllers;

import com.company.enroller.model.Meeting;
import com.company.enroller.model.Participant;
import com.company.enroller.persistence.MeetingService;
import com.company.enroller.persistence.ParticipantService;
import org.hibernate.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/meetings")
public class MeetingRestController {
    @Autowired
    MeetingService meetingService;

    @Autowired
    ParticipantService participantService;


    @RequestMapping(value="", method = RequestMethod.GET)
    public ResponseEntity<?> getMeetings() {
        Collection<Meeting> meetings = meetingService.getAll();
        return new ResponseEntity<Collection<Meeting>>(meetings, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> getMeetingById(@PathVariable("id") long id) {
        Meeting meeting = meetingService.getMeetingById(id);
        if (meeting == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Meeting>(meeting, HttpStatus.OK);
    }

    @RequestMapping(value="", method = RequestMethod.POST)
    public ResponseEntity<?> createMeeting(@RequestBody Meeting meeting) {
        Meeting foundMeeting = meetingService.getMeetingById(meeting.getId());
        if (foundMeeting != null) {
            return new ResponseEntity("Unable to add meeting", HttpStatus.CONFLICT);
        }
        Meeting meeting1 = meetingService.createMeeting(meeting);
        return new ResponseEntity<Meeting>(meeting1, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> removeMeetingById(@PathVariable("id") long id) {
        Meeting meeting = meetingService.getMeetingById(id);
        if(meeting == null) {
            return new ResponseEntity<>("unable to remove meeting", HttpStatus.NOT_FOUND);
        }
        Meeting meeting1 = meetingService.removeMeetingById(id);
        return new ResponseEntity<Meeting>(meeting1, HttpStatus.OK);
    }

    @RequestMapping(value="/{id}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateMeetingById(@PathVariable("id") long id, @RequestBody Meeting meeting) {
        Meeting foundMeeting = meetingService.getMeetingById(id);
        if (foundMeeting == null) {
            return new ResponseEntity<>("Unable to update meeting", HttpStatus.CONFLICT);
        }
        Meeting meeting1 = meetingService.updateMeetingById(meeting,id);
        return new ResponseEntity<>(meeting1, HttpStatus.OK);
    }

    @RequestMapping(value ="/{id}/participants", method = RequestMethod.GET)
    public ResponseEntity<?> getMeetingParticipants(@PathVariable("id") long id) {
        Meeting meeting = meetingService.getMeetingById(id);
        if (meeting == null) {
            return new ResponseEntity<>("unable to find meeting", HttpStatus.NOT_FOUND);
        }
        Collection<Participant> meeting1 = meetingService.getParticipantsFromMeeting(meeting);
        return new ResponseEntity<>(meeting1, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/participants", method = RequestMethod.POST)
    public ResponseEntity<?> getMeetingParticipants(@PathVariable("id") long id, @RequestBody Participant participant) {
        Meeting foundMeeting = meetingService.getMeetingById(id);
        System.out.println(foundMeeting);
        if (foundMeeting == null) {
            return new ResponseEntity<>("Meeting not found", HttpStatus.NOT_FOUND);
        }

        Participant existingParticipant = participantService.findByLogin(participant.getLogin());
        if(existingParticipant == null) {
            return new ResponseEntity<>("Unable to find participant", HttpStatus.NOT_FOUND);
        }

        if(foundMeeting.getParticipants().contains(existingParticipant)) {
            return new ResponseEntity<>("Participant already enrolled", HttpStatus.CONFLICT);
        }
        Meeting foundMeeting1 = meetingService.addParticipantToMeeting(foundMeeting, participant);
        return new ResponseEntity<>(foundMeeting1, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}/participants/{login}", method = RequestMethod.DELETE)
    public ResponseEntity<?> removeParticipantFromMeeting(@PathVariable("id") long id, @PathVariable("login") String login) {
        Meeting meeting = meetingService.getMeetingById(id);
        if (meeting == null) {
            return new ResponseEntity<>("Meeting not found", HttpStatus.NOT_FOUND);
        }
        System.out.println(meeting);
        System.out.println("ID" + id);
        System.out.println("Login" + login);
        Participant existingParticipant = participantService.findByLogin(login);
        System.out.println(existingParticipant.getLogin());
        if(existingParticipant.getLogin() == null) {
            return new ResponseEntity<>("Unable to find participant", HttpStatus.NOT_FOUND);
        }

        if(!meeting.getParticipants().contains(existingParticipant)) {
            return new ResponseEntity<>("Participant not enrolled", HttpStatus.CONFLICT);
        }

        Meeting meeting1 = meetingService.removeParticipantFromMeeting(meeting,existingParticipant);
        return new ResponseEntity<>(meeting1, HttpStatus.OK);
    }


    @RequestMapping(value="/{id}/all_participants", method = RequestMethod.DELETE)
    public ResponseEntity<?> removeParticipantFromMeeting(@PathVariable("id") long id) {
        Meeting foundMeeting = meetingService.getMeetingById(id);
        if (foundMeeting == null) {
            return new ResponseEntity<>("Meeting not found", HttpStatus.NOT_FOUND);
        }
        Meeting updatedMeeting = meetingService.removeParticipantsFromMeeting(id);
        return new ResponseEntity<>(updatedMeeting, HttpStatus.OK);
    }
}
