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
        // Initialisation de l'objet teacher1
        teacher1 = new Teacher(1L, "L eponge", "Bob",
                LocalDateTime.of(2023, 9, 24, 14, 30, 0),
                LocalDateTime.of(2023, 9, 24, 14, 30, 0));
    }

    @Test
    public void testFindById() {
        // Simule le comportement du repository pour retourner un Optional contenant teacher1
        when(teacherRepository.findById(1L)).thenReturn(Optional.of(teacher1));

        // Appel de la méthode findById() du service
        Teacher result = teacherService.findById(1L);

        // Vérification des valeurs
        assertEquals(1L, result.getId());
        assertEquals("Bob", result.getFirstName());
        assertEquals(LocalDateTime.of(2023, 9, 24, 14, 30, 0), result.getCreatedAt());
    }
}
