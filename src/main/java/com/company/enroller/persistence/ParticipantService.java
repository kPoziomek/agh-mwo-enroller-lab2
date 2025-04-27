package com.company.enroller.persistence;

import java.util.Collection;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.company.enroller.model.Participant;

@Component("participantService")
public class ParticipantService {

    private static final Logger log = LoggerFactory.getLogger(ParticipantService.class);
    DatabaseConnector connector;

    public ParticipantService() {
        connector = DatabaseConnector.getInstance();
    }

    public Collection<Participant> getAll(String sortBy, String orderBy, String filterByValue) {
        String hql = "FROM Participant";
        String hqlFilter = " WHERE login LIKE  '%" + filterByValue + "%'";
        if(sortBy != null || orderBy != null) {
            hql += " ORDER BY " + sortBy + " " + orderBy;
        }
        if(filterByValue != null) {
            hql +=  hqlFilter;
        }
        Query query = connector.getSession().createQuery(hql);
        return query.list();
    }

    public Participant findByLogin(String login) {
        String hql = "FROM Participant WHERE login = :login";
        Query query = connector.getSession().createQuery(hql);
        query.setParameter("login",login);
        return (Participant) query.uniqueResult();
    }

    public Participant registerParticipant(Participant participant) {
        Session session = connector.getSession();
        Transaction tx = session.beginTransaction();
        session.save(participant);
        tx.commit();
        return participant;
    }

    public Participant removeByLogin(String login) {
        Session session = connector.getSession();
        Transaction tx = session.beginTransaction();
        session.delete(findByLogin(login));
        tx.commit();
        return null;
    }


    public Participant updateByLogin(Participant participant, Participant foundParticipant) {
        Session session = connector.getSession();
        Transaction tx = session.beginTransaction();
        foundParticipant.setPassword(participant.getPassword());
        session.update(foundParticipant);
        tx.commit();
        return participant;
    }
}
