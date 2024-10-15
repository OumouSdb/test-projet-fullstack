package controllers;

import com.openclassrooms.starterjwt.controllers.TeacherController;
import com.openclassrooms.starterjwt.dto.TeacherDto;
import com.openclassrooms.starterjwt.mapper.TeacherMapper;
import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.services.TeacherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import java.time.LocalDateTime;
import java.util.Collections;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TeacherControllerTest {

    @InjectMocks
    private TeacherController teacherController;

    @Mock
    private TeacherService teacherService;

    @Mock
    private TeacherMapper teacherMapper;

    private Teacher teacher;
    private TeacherDto teacherDto;

    @BeforeEach
    public void setUp() {
        teacher = new Teacher();
        teacher.setId(1L);
        teacher.setFirstName("John");
        teacher.setLastName("Doe");
        teacher.setCreatedAt(LocalDateTime.now());
        teacher.setUpdatedAt(LocalDateTime.now());

        teacherDto = new TeacherDto();
        teacherDto.setId(1L);
        teacherDto.setFirstName("John");
        teacherDto.setLastName("Doe");
        teacherDto.setCreatedAt(LocalDateTime.now());
        teacherDto.setUpdatedAt(LocalDateTime.now());
    }

    @Test
    public void findById_teacherExists() {

        when(teacherService.findById(1L)).thenReturn(teacher);
        when(teacherMapper.toDto(teacher)).thenReturn(teacherDto);

        ResponseEntity<?> response = teacherController.findById("1");

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(teacherDto, response.getBody());
    }

    @Test
    public void findById_teacherDoesNotExist() {

        when(teacherService.findById(1L)).thenReturn(null);


        ResponseEntity<?> response = teacherController.findById("1");


        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    public void findById_ShouldReturnBadRequest_WhenIdIsInvalid() {
        ResponseEntity<?> response = teacherController.findById("invalid-id");

        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    public void findById_ShouldReturnBadRequest_WhenIdIsEmpty() {
        ResponseEntity<?> response = teacherController.findById("");

        assertEquals(400, response.getStatusCodeValue());
    }

    @Test
    public void findAll_ShouldReturnListOfTeacherDtos() {
        when(teacherService.findAll()).thenReturn(Collections.singletonList(teacher));
        when(teacherMapper.toDto(Collections.singletonList(teacher))).thenReturn(Collections.singletonList(teacherDto));
        ResponseEntity<?> response = teacherController.findAll();
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(Collections.singletonList(teacherDto), response.getBody());
    }

}
