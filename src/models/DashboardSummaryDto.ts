export interface DashboardSummaryDto {
  totalCount: number;
  countPerType: Record<string, number>;
  countPerGeneration: Record<string, number>;
}