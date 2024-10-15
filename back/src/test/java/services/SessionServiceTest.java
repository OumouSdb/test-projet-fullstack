package services;

import com.openclassrooms.starterjwt.SpringBootSecurityJwtApplication;
import com.openclassrooms.starterjwt.exception.BadRequestException;
import com.openclassrooms.starterjwt.exception.NotFoundException;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.models.User;
import com.openclassrooms.starterjwt.repository.SessionRepository;
import com.openclassrooms.starterjwt.repository.UserRepository;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = SpringBootSecurityJwtApplication.class)
@AutoConfigureMockMvc
public class SessionServiceTest {

    @InjectMocks
    private SessionService sessionService;

    @Mock
    private SessionRepository sessionRepository;

    @Mock
    private UserRepository userRepository;

    private Session session;
    private Teacher teacher;
    private User user;

    @BeforeEach
    private void setup() {
        user = new User();
        user.setId(2L);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@doe.com");
        user.setPassword("password");
        user.setCreatedAt(LocalDateTime.of(2023, 9, 24, 14, 30, 0));
        user.setUpdatedAt(LocalDateTime.of(2023, 9, 24, 14, 30, 0));
        user.setAdmin(false);

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
                .users(new ArrayList<>())
                .build();
    }

    @Test
    public void testCreateSession() {
        when(sessionRepository.save(any(Session.class))).thenReturn(session);
        Session sessionCreated = sessionService.create(session);

        verify(sessionRepository, times(1)).save(session);

        assertEquals(sessionCreated.getDescription(), session.getDescription());
        assertEquals(sessionCreated.getId(), session.getId());
        assertEquals(sessionCreated.getName(), session.getName());
    }

    @Test
    public void testParticipate_Success() {
        Long sessionId = 1L;
        Long userId = 2L;

        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        sessionService.participate(sessionId, userId);
        assertTrue(session.getUsers().contains(user));
        verify(sessionRepository, times(1)).save(session);
    }

    @Test
    public void testAlreadyExist_failed() {
        Long sessionId = 1L;
        Long userId = 2L;

        session.getUsers().add(user);

        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        assertThrows(BadRequestException.class, () -> {
            sessionService.participate(sessionId, userId);
        });
        verify(sessionRepository, times(0)).save(any(Session.class));
    }

    @Test
    public void testParticipate_InvalidUserId() {
        Long sessionId = 1L;
        Long userId = null;

        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        assertThrows(NotFoundException.class, () -> {
            sessionService.participate(sessionId, userId);
        });

        verify(sessionRepository, times(0)).save(any(Session.class));
    }

    @Test
    public void testNoLongerParticipate_Success() {
        Long sessionId = 1L;
        Long userId = 2L;
        session.getUsers().add(user);

        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        sessionService.noLongerParticipate(sessionId, userId);

        assertFalse(session.getUsers().contains(user));

        verify(sessionRepository, times(1)).save(session);
    }


    @Test
    public void testGetById_Success() {
        Long sessionId = 1L;
        when(sessionRepository.findById(sessionId)).thenReturn(Optional.of(session));

        Session result = sessionService.getById(sessionId);

        verify(sessionRepository, times(1)).findById(sessionId);

        assertNotNull(result);
        assertEquals(session.getId(), result.getId());
    }

}