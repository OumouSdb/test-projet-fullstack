package controllers;

import com.openclassrooms.starterjwt.controllers.SessionController;
import com.openclassrooms.starterjwt.dto.SessionDto;
import com.openclassrooms.starterjwt.mapper.SessionMapper;
import com.openclassrooms.starterjwt.models.Session;
import com.openclassrooms.starterjwt.services.SessionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SessionControllerTest {

    @InjectMocks
    private SessionController sessionController;

    @Mock
    private SessionService sessionService;

    @Mock
    private SessionMapper sessionMapper;

    private Session session;
    private SessionDto sessionDto;

    @BeforeEach
    public void setUp() {
        session = new Session();
        session.setId(1L);
        session.setName("Sample Session");
        session.setDescription("This is a sample session.");
        session.setDate(new Date());
        session.setCreatedAt(LocalDateTime.now());
        session.setUpdatedAt(LocalDateTime.now());

        sessionDto = new SessionDto();
        sessionDto.setId(1L);
        sessionDto.setName("Sample Session");
        sessionDto.setDescription("This is a sample session.");
        sessionDto.setDate(new Date());
        sessionDto.setCreatedAt(LocalDateTime.now());
        sessionDto.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    public void findById_ShouldReturnSessionDto_WhenSessionExists() {
        when(sessionService.getById(1L)).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(sessionDto);

        ResponseEntity<?> response = sessionController.findById("1");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(sessionDto, response.getBody());
    }

    @Test
    public void findById_ShouldReturnNotFound_WhenSessionDoesNotExist() {

        when(sessionService.getById(1L)).thenReturn(null);
        ResponseEntity<?> response = sessionController.findById("1");

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    public void findById_ShouldReturnBadRequest_WhenIdIsInvalid() {

        ResponseEntity<?> response = sessionController.findById("invalid-id");

        assertEquals(400, response.getStatusCodeValue());
    }
    @Test
    public void findById_ShouldReturnBadRequest_WhenIdIsNull() {
        ResponseEntity<?> response = sessionController.findById(null);

        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    public void findAllTest() {

        when(sessionService.findAll()).thenReturn(Collections.singletonList(session));
        when(sessionMapper.toDto(Collections.singletonList(session))).thenReturn(Collections.singletonList(sessionDto));

        ResponseEntity<?> response = sessionController.findAll();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(Collections.singletonList(sessionDto), response.getBody());
    }

    @Test
    public void create_sessionTest() {

        when(sessionMapper.toEntity(sessionDto)).thenReturn(session);
        when(sessionService.create(session)).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(sessionDto);

        ResponseEntity<?> response = sessionController.create(sessionDto);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(sessionDto, response.getBody());
    }

    @Test
    public void update_SessionTest() {
        when(sessionService.update(1L, session)).thenReturn(session);
        when(sessionMapper.toEntity(sessionDto)).thenReturn(session);
        when(sessionMapper.toDto(session)).thenReturn(sessionDto);

        ResponseEntity<?> response = sessionController.update("1", sessionDto);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(sessionDto, response.getBody());
    }

    @Test
    public void sessionIsDeletedTest() {

        when(sessionService.getById(1L)).thenReturn(session);

        ResponseEntity<?> response = sessionController.save("1");

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    public void participate_AtSessionTest() {

        long sessionId = 1L;
        long userId = 2L;

        ResponseEntity<?> response = sessionController.participate(String.valueOf(sessionId), String.valueOf(userId));

        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    public void userNoLongerParticipateTest() {

        long sessionId = 1L;
        long userId = 2L;

        ResponseEntity<?> response = sessionController.noLongerParticipate(String.valueOf(sessionId), String.valueOf(userId));

        assertEquals(200, response.getStatusCodeValue());
    }
}
