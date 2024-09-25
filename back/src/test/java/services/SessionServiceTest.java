package services;

import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SessionServiceTest {

    @InjectMocks
    private SessionService sessionService;

    @Mock
    private SessionRepository sessionRepository;

    private Session session;

    private Teacher teacher;

    @BeforeEach
    private void setup(){
        teacher = new Teacher();
        teacher.setId(1L);
        teacher.setLastName("Doyle");
        teacher.setFirstName("Olis");
        teacher.setCreatedAt(LocalDateTime.of(2023, 9, 24, 14, 30, 0));
        teacher.setUpdatedAt(LocalDateTime.of(2023, 9, 24, 14, 30, 0));

        session = Session.builder()
                .id(1L)
                .name("Mathematics 101")
                .date(new Date())
                .description("This is a math session")
                .teacher(teacher)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
    }


    @Test
    public void testCreateSession(){

        when(sessionRepository.save(any(Session.class))).thenReturn(session);
        Session sessionCreated = sessionService.create(session);
        verify(sessionRepository, times(1)).save(session);

        assertEquals(sessionCreated.getDescription(), session.getDescription());
        assertEquals(sessionCreated.getId(), session.getId());
        assertEquals(sessionCreated.getName(), session.getName());
    }

    @Test
    public void testUpdateSession(){
        session.setName("Esperanza");
        session.setUpdatedAt(LocalDateTime.now());
        LocalDateTime updatedTime = LocalDateTime.now();
        session.setUpdatedAt(updatedTime);

        when(sessionService.update(1L, session)).thenReturn(session);
        Session sessionUpdate = sessionService.update(1L, session);
        verify(sessionRepository, times(1)).save(session);

        assertEquals(updatedTime, sessionUpdate.getUpdatedAt());
        assertEquals("Esperanza", sessionUpdate.getName());
        assertEquals(1L, sessionUpdate.getId());
    }


}
