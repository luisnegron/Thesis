// question-management.component.ts
import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.css']
})
export class QuestionManagementComponent implements OnInit {
  questions: any[] = [];
  selectedQuestion: any = {};
  showModal: boolean = false;
  isEditMode: boolean = false;
  searchText: string = '';

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe(
      data => {
        this.questions = data;
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.selectedQuestion = {};
    this.showModal = true;
  }

  openEditModal(question: any): void {
    this.isEditMode = true;
    this.selectedQuestion = { ...question };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  createQuestion(question: any): void {
    this.questionService.createQuestion(question).subscribe(
      () => {
        this.loadQuestions();
        this.closeModal();
      },
      error => {
        console.error('Error creating question:', error);
      }
    );
  }

  updateQuestion(question: any): void {
    this.questionService.updateQuestion(question._id, question).subscribe(
      () => {
        this.loadQuestions();
        this.closeModal();
      },
      error => {
        console.error('Error updating question:', error);
      }
    );
  }

  deleteQuestion(id: string): void {
    this.questionService.deleteQuestion(id).subscribe(
      () => {
        this.loadQuestions();
      },
      error => {
        console.error('Error deleting question:', error);
      }
    );
  }

  // Implementación del método searchQuestion
  searchQuestion(): void {
    if (this.searchText) {
      this.questionService.searchQuestions(this.searchText).subscribe(
        data => {
          this.questions = data;
        },
        error => {
          console.error('Error searching questions:', error);
        }
      );
    } else {
      this.loadQuestions();
    }
  }

  // Implementación del método viewQuestion
  viewQuestion(id: string): void {
    this.questionService.getQuestionById(id).subscribe(
      question => {
        this.selectedQuestion = question;
        this.showModal = true; // Abre el modal para ver la pregunta
      },
      error => {
        console.error('Error fetching question details:', error);
      }
    );
  }
}
