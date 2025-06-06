package com.company.enroller.persistence;

import com.company.enroller.model.Participant;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component("participantService")
@DependsOn("hibernateUtil")
public class ParticipantService {

    DatabaseConnector connector;

    public ParticipantService() {
        connector = DatabaseConnector.getInstance();
    }

    public Collection<Participant> getAll(String login, String sortMode, String sortOrder) {
        String hql = "FROM Participant WHERE login LIKE :login";

        if (sortMode.equals("login")) {
            hql += " ORDER BY login";
            if (sortOrder.equals("ASC") || sortOrder.equals("DESC")) {
                hql += " " + sortOrder;
            }
        }

        Query query = connector.getSession().createQuery(hql);
        query.setParameter("login", "%" + login + "%");
        return query.list();
    }

    public Participant findByLogin(String login) {
        System.out.println(login);
        return connector.getSession().get(Participant.class, login);
    }

    public Participant add(Participant participant) {
        Transaction transaction = connector.getSession().beginTransaction();
        connector.getSession().save(participant);
        transaction.commit();
        return participant;
    }

    public void update(Participant participant) {
        Transaction transaction = connector.getSession().beginTransaction();
        connector.getSession().merge(participant);
        transaction.commit();
    }

    public void delete(Participant participant) {
        Transaction transaction = connector.getSession().beginTransaction();
        connector.getSession().delete(participant);
        transaction.commit();
    }

}
