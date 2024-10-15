package services;

import com.openclassrooms.starterjwt.models.Teacher;
import com.openclassrooms.starterjwt.repository.TeacherRepository;
import com.openclassrooms.starterjwt.services.TeacherService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TeacherServiceTest {

    @Mock
    private TeacherRepository teacherRepository;

    @InjectMocks
    private TeacherService teacherService;

    private Teacher teacher1;

    @BeforeEach
    public void setup() {
        teacher1 = new Teacher(1L, "L eponge", "Bob",
                LocalDateTime.of(2023, 9, 24, 14, 30, 0),
                LocalDateTime.of(2023, 9, 24, 14, 30, 0));
    }

    @Test
    public void testFindById() {
        when(teacherRepository.findById(1L)).thenReturn(Optional.of(teacher1));

        Teacher result = teacherService.findById(1L);

        assertEquals(1L, result.getId());
        assertEquals("Bob", result.getFirstName());
        assertEquals(LocalDateTime.of(2023, 9, 24, 14, 30, 0), result.getCreatedAt());
    }

    @Test
    public void testFindAll() {
        List<Teacher> teachers = Arrays.asList(
                new Teacher(1L, "L eponge", "Bob",
                        LocalDateTime.of(2023, 9, 24, 14, 30, 0),
                        LocalDateTime.of(2023, 9, 24, 14, 30, 0)),
                new Teacher(2L, "Carré", "Patrick",
                        LocalDateTime.of(2023, 9, 25, 14, 30, 0),
                        LocalDateTime.of(2023, 9, 25, 14, 30, 0))
        );

        when(teacherRepository.findAll()).thenReturn(teachers);

        List<Teacher> result = teacherService.findAll();

        assertEquals(2, result.size());
        assertEquals("Bob", result.get(0).getFirstName());
        assertEquals("Patrick", result.get(1).getFirstName());
        verify(teacherRepository, times(1)).findAll();
    }

    @Test
    public void testUpdateTeacher() {
        Teacher updatedTeacher = new Teacher(1L, "L eponge", "Bob",
                LocalDateTime.of(2023, 9, 24, 14, 30, 0),
                LocalDateTime.of(2023, 10, 1, 14, 30, 0));

        when(teacherRepository.save(any(Teacher.class))).thenReturn(updatedTeacher);

        Teacher result = teacherRepository.save(updatedTeacher);

        assertEquals("Bob", result.getFirstName());
        assertEquals(LocalDateTime.of(2023, 10, 1, 14, 30, 0), result.getUpdatedAt());

        verify(teacherRepository, times(1)).save(updatedTeacher);
    }

    @Test
    public void testSaveTeacher() {
        Teacher newTeacher = new Teacher(null, "Carré", "Patrick",
                LocalDateTime.now(), LocalDateTime.now());

        when(teacherRepository.save(newTeacher)).thenReturn(new Teacher(2L, "Carré", "Patrick",
                LocalDateTime.of(2023, 10, 1, 14, 30, 0), LocalDateTime.of(2023, 10, 1, 14, 30, 0)));

        Teacher result = teacherRepository.save(newTeacher);

        assertNotNull(result.getId());
        assertEquals(2L, result.getId());
        assertEquals("Patrick", result.getFirstName());

        verify(teacherRepository, times(1)).save(newTeacher);
    }

}
