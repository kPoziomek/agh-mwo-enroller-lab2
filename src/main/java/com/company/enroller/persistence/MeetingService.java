package com.company.enroller.persistence;

import com.company.enroller.model.Meeting;
import com.company.enroller.model.Participant;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component("meetingService")
public class MeetingService {
	private static final Logger log = LoggerFactory.getLogger(ParticipantService.class);


	Session session;

	public MeetingService() {
		session = DatabaseConnector.getInstance().getSession();

	}

	public Collection<Meeting> getAll() {
		String hql = "FROM Meeting";
		Query query = this.session.createQuery(hql);
		return query.list();
	}

	public Meeting getMeetingById(long id) {
		String hql = "FROM Meeting WHERE id = :id";
		Query query = this.session.createQuery(hql);
		query.setParameter("id", id);
		return (Meeting) query.uniqueResult();
	}

	public Meeting createMeeting(Meeting meeting) {
		Transaction tx = session.beginTransaction();
		session.save(meeting);
		tx.commit();
		return meeting;
	}
	public Meeting removeMeetingById(long id) {
		Transaction tx = session.beginTransaction();
		session.delete(getMeetingById(id));
		tx.commit();
		return null;
	}

	public Meeting updateMeetingById(Meeting meeting, long id) {
		Transaction tx = session.beginTransaction();
		Meeting updatedMeeting = getMeetingById(id);
		updatedMeeting.setTitle(meeting.getTitle());
		updatedMeeting.setDescription(meeting.getDescription());
		updatedMeeting.setDate(meeting.getDate());
		System.out.println(updatedMeeting);
		session.update(updatedMeeting);
		tx.commit();
		return updatedMeeting;
	}

	public Meeting addParticipantToMeeting(Meeting meeting, Participant participant) {
		Transaction tx = session.beginTransaction();
		meeting.addParticipant(participant);
		session.update(meeting);
		tx.commit();
		return meeting;
	}

	public Meeting removeParticipantFromMeeting(Meeting meeting, Participant participant) {
		Transaction tx = session.beginTransaction();
		meeting.removeParticipant(participant);
		session.update(meeting);
		tx.commit();
		return meeting;
	}

	public Collection<Participant> getParticipantsFromMeeting(Meeting meeting) {
        return meeting.getParticipants();

	}

	public Meeting removeParticipantsFromMeeting(long meetingId) {
		Transaction tx = session.beginTransaction();
		Meeting removedMeeting = getMeetingById(meetingId);
		if(removedMeeting != null) {
			removedMeeting.getParticipants().clear();
			session.update(removedMeeting);
			tx.commit();
		}
		return removedMeeting;
	}
}
